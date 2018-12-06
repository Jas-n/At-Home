<?php class calendar{
	function __construct(){
	}
	function add_event($data){
		global $db;
		$db->query(
			"INSERT INTO `events` (
				`event_type_id`,`start`,`end`,`recurrence`,`name`,
				`description`,	`added`
			) VALUES (?,?,?,?,?,	?,?)",
			array(
				$data['type'],
				$data['start'],
				date('Y-m-d H:i:s',strtotime($data['start'].' +1 day -1 second')),
				$data['recurrence'],
				$data['name'],

				$data['description'],
				date('Y-m-d H:i:s')
			)
		);
	}
	function get_event_types(){
		global $db;
		return $db->query("SELECT * FROM `event_types` ORDER BY `name` ASC");
	}
	function get_schedule(){
		global $db;
		if($count=$db->result_count("FROM `events`")){
			# if (this year plus this month and date) is in the future, show as concat'd else add a year
			if($rows=$db->query(
				"SELECT
					*,
					IF(
						`recurrence`<>0,
						IF(
							CONCAT(YEAR(NOW()),'-',MONTH(`start`),'-',DAY(`start`)+1)>DATE(NOW()),
							CONCAT(YEAR(NOW()),'-',MONTH(`start`),'-',DAY(`start`)),
							CONCAT(YEAR(NOW())+1,'-',MONTH(`start`),'-',DAY(`start`))
						),
						`start`
					) as `next`,
					0 as `count`
				FROM `events`
				WHERE
					`start` > ? OR
					`recurrence` <> 0
				ORDER BY
					YEAR(`next`),
					MONTH(`next`),
					DAY(`next`)
				LIMIT ".ITEMS_PER_PAGE,
				array(
					date('Y-m-d H:i:s')
				)
			)){
				foreach($rows as $row){
					switch($row['recurrence']){
						case 1:
							$row['count']=date('Y',strtotime($row['next']))-date('Y',strtotime($row['start']));
							break;
					}
					$events[strtotime($row['next'])][]=$row;
				}
				ksort($events);
			}
		}
		return array(
			'count'	=>$count,
			'rows'	=>$events
		);
	}
}