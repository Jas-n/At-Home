<?php class app{
	function __construct(){
	}
	function app_details($data){
		global $db;
		$next=$db->get_row(
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
				) as `next`
			FROM `events`
			WHERE
				`start` > ? OR
				`recurrence` <> 0
			ORDER BY
				YEAR(`next`),
				MONTH(`next`),
				DAY(`next`)",
			date('Y-m-d H:i:s')
		);
		$date	=strtotime('2020-10-10');
		$now	=time();
		$seconds=$date-$now;
		$minutes=$seconds/60;
		$hours	=$minutes/60;
		$days	=ceil($hours/24);
		return array(
			'calendar'	=>'Next Event<br>'.format_date($next['next']).'<br>'.$next['name'],
			'tasks'		=>number_format($db->result_count("FROM `tasks`")).' items',
			'wedding'	=>'Less than '.$days.' days'
		);
	}
}