<?php class tasks{
	function __construct(){
	}
	function get_tasks(){
		global $db;
		if($count=$db->result_count("FROM `tasks` WHERE `status`=0 AND `parent_id`=0")){
			$rows=$db->query(
				"SELECT
					`tasks`.*,
					(SELECT COUNT(*) FROM `tasks` `tc` WHERE `tc`.`parent_id`=`tasks`.`id`) as `children`
				FROM `tasks`
				WHERE
					`status`=0 AND
					`parent_id`=0
				ORDER BY `added` ASC
				LIMIT ".ITEMS_PER_PAGE
			);
		}
		return array(
			'count'	=>$count,
			'rows'	=>$rows
		);
	}
}