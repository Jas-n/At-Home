<?php class tasks{
	function __construct(){
	}
	function add_task($data){
		global $db;
		$db->query(
			"INSERT INTO `tasks` (
				`parent_id`,`description`,`added`
			) VALUES (?,?,?)",
			array(
				$data['parent'],
				$data['description'],
				date('Y-m-d H:i:s')
			)
		);
		return $this->get_task(array('id'=>$db->insert_id()));
	}
	function delete_task($data){
		global $db;
		$db->query("DELETE FROM `tasks` WHERE `id`=?",$data['id']);
		return $data['id'];
	}
	function get_task($data){
		global $db;
		$task=$db->get_row("SELECT * FROM `tasks` WHERE `id`=?",$data['id']);
		$task['children']=$this->get_tasks($data['id']);
		$task['children_count']=$task['children']['count']?$task['children']['count']:0;
		$task['children_complete']=$task['children']['count']?array_sum(array_column($task['children']['rows'],'status')):0;
		return $task;
	}
	function get_tasks($data=false){
		global $db;
		if($count=$db->result_count("FROM `tasks` WHERE `status`=0 AND `parent_id`=?",$data['parent'])){
			$rows=$db->query(
				"SELECT
					`tasks`.*,
					(SELECT COUNT(*) FROM `tasks` `tc` WHERE `tc`.`parent_id`=`tasks`.`id`) as `children_count`,
					(SELECT COUNT(*) FROM `tasks` `tc` WHERE `tc`.`parent_id`=`tasks`.`id` AND `tc`.`status`=1) as `children_complete`
				FROM `tasks`
				WHERE
					`status`=0 AND
					`parent_id`=?
				ORDER BY `description` ASC
				LIMIT ".ITEMS_PER_PAGE,
				$data['parent']
			);
		}
		return array(
			'count'	=>$count,
			'rows'	=>$rows
		);
	}
}