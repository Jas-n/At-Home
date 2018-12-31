<?php class w_guests{
	function __construct(){
	}
	public function add_guest($data){
		global $db;
		$db->query(
			"INSERT INTO `w_guests` (
				`name`,`type`,`time`
			) VALUES (?,?,?)",
			array(
				$data['name'],
				$data['type'],
				$data['time']
			)
		);
		return $this->get_guests();
	}
	public function get_guests(){
		global $db;
		$return=array(
			'guests'=>$db->query("SELECT * FROM `w_guests` ORDER BY `name` ASC"),
			'totals'=>array(
				'adults'	=>$db->result_count("FROM `w_guests` WHERE `type`=?",1),
				'children'	=>$db->result_count("FROM `w_guests` WHERE `type`=?",2),
				'ceremony'	=>$db->result_count("FROM `w_guests` WHERE `time`=?",1),
				'evening'	=>$db->result_count("FROM `w_guests` WHERE `time`=?",2),
				'total'=>0
			)
		);
		$return['totals']['total']=sizeof($return['guests']);
		return $return;
	}
}