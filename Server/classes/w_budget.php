<?php class w_budget{
	function __construct(){
	}
	public function add_budget($data){
		global $db;
		$db->query(
			"INSERT INTO `w_budget` (
				`name`,`type`,`value`
			) VALUES (?,?,?)",
			array(
				$data['name'],
				$data['type'],
				$data['value']
			)
		);
		return $this->get_budget();
	}
	public function get_budget(){
		global $db;
		$return=array(
			'in'=>$db->query("SELECT * FROM `w_budget` WHERE `type`=? ORDER BY `name` ASC",1),
			'out'=>$db->query("SELECT * FROM `w_budget` WHERE `type`=? ORDER BY `name` ASC",2),
			'totals'=>array(
				'in'=>0,
				'out'=>0,
				'total'=>0
			)
		);
		if($return['in']){
			$return['totals']['in']=array_sum(array_column($return['in'],'value'));
		}
		if($return['out']){
			$return['totals']['out']=array_sum(array_column($return['out'],'value'));
		}
		$return['totals']['total']=$return['totals']['in']-$return['totals']['out'];
		return $return;
	}
}