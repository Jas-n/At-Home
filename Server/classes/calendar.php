<?php class calendar{
	function __construct(){
	}
	function get_schedule(){
		global $db;
		if($count=$db->result_count("FROM `events`")){
			# if (this year plus this month and date) is in the future, show as concat'd else add a year
			$rows=$db->query(
				"SELECT
					*,
					IF(
						`recurrence`<>0,
						IF(
							CONCAT(YEAR(NOW()),'-',MONTH(`start`),'-',DAY(`start`))>DATE(NOW()),
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
				ORDER BY `start` ASC
				LIMIT ".ITEMS_PER_PAGE,
				array(
					date('Y-m-d H:i:s')
				)
			);
			foreach($rows as &$row){
				switch($row['recurrence']){
					case 1:
						$row['count']=date('Y',strtotime($row['next']))-date('Y',strtotime($row['start']));
						break;
				}
			}
		}
		return array(
			'count'	=>$count,
			'rows'	=>$rows
		);
	}
}