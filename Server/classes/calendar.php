<?php class calendar{
	function __construct(){
	}
	function get_schedule(){
		global $db;
		if($count=$db->result_count("FROM `events`")){
			# if (this year plus this month and date) is in the future, show as concat'd else add a year
			$rows=$db->query(
				"SELECT
					*#,
					#IF(CONCAT(YEAR(NOW()),'-',MONTH(`start`),'-',DAY(`start`))>DATE(NOW)) as `this_year`
				FROM `events`
				WHERE
					(
						`recurrence`=1
					)
				ORDER BY `start` ASC
				LIMIT ".ITEMS_PER_PAGE#,
				#strtotime('monday')
			);
		}
		return array(
			'count'	=>$count,
			'rows'	=>$rows
		);
	}
}