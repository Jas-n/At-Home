<?php class tasks{
	function __construct(){
	}
	public function add_task($data){
		global $db,$ranks;
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
		$task_id=$db->insert_id();
		$ranks->increment();
		return $this->get_task(array('id'=>$task_id));
	}
	public function delete_task($data){
		global $db,$ranks;
		$db->query("DELETE FROM `tasks` WHERE `id`=?",$data['id']);
		$ranks->increment();
		return $data['id'];
	}
	public function get_task($id){
		global $db;
		return $db->get_row("SELECT * FROM `tasks` WHERE `id`=?",$id);
	}
	public function get_tasks($data=false){
		global $db;
		if($data['parent']){
			$task=$db->get_row("SELECT * FROM `tasks` WHERE `id`=?",$data['parent']);
			$parent=$task['parent_id'];
			while($parent!=0){
				$row=$db->get_row("SELECT `id`,`description`,`parent_id` FROM `tasks` WHERE `id`=?",$parent);
				$task['parents'][]=$row;
				$parent=$row['parent_id'];
			}
			if($task['parents']){
				$task['parents']=array_reverse($task['parents']);
			}
		}
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
			'rows'	=>$rows,
			'task'	=>$task
		);
	}
}