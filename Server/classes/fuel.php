<?php class fuel{
	function __construct(){
	}
	public function add_fuel($data){
		global $db,$ranks;
		$db->query(
			"INSERT INTO `fuel` (
				`user`,	`date`,`mileage`,`per_litre`,`cost`,
				`litres`
			) VALUES (?,?,?,?,?,	?)",
			array(
				$data['user'],
				$data['date'],
				$data['mileage'],
				$data['per_litre'],
				$data['cost'],

				$data['litres'],
			)
		);
		$ranks->increment();
		return $this->get_fuel(array('user'=>$data['user']));
	}
	public function get_fuel($data=false){
		global $db;
		return array(
			'logs'=>$db->query(
				"SELECT *
				FROM `fuel`
				WHERE `user`=?
				ORDER BY
					`date` DESC,
					`id` DESC
				LIMIT ".ITEMS_PER_PAGE,
				$data['user']
			),
			'totals'=>$db->get_row(
				"SELECT
					SUM(`mileage`) as `mileage`,
					SUM(`cost`) as `cost`,
					SUM(`litres`) as `litres`
				FROM `fuel`
				WHERE `user`=?",
				$data['user']
			)
		);
	}
}