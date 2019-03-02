<?php class ranks{
	public function increment(){
		global $db,$user_id;
		$db->query(
			"UPDATE `users`
			SET `points`=`points`+1
			WHERE `id`=?",
			$user_id
		);
		return $this->get_rank($user_id);
	}
	public function get_rank($user){
		global $db;
		if(!$db->result_count("FROM `ranks` WHERE `points`>(SELECT MAX(`points`) FROM `users`)")){
			$this->add_rank();
		}
		$rank=$db->get_row(
			"SELECT
				`users`.`points`,
				(SELECT `rank` FROM `ranks` WHERE `points`<=`users`.`points` ORDER BY `rank` DESC LIMIT 1) as `rank`,
				(
					SELECT `points` FROM `ranks` WHERE `rank`=(
						IF(
							(SELECT `rank` FROM `ranks` WHERE `points`>`users`.`points` ORDER BY `rank` ASC LIMIT 1),
							(SELECT `rank` FROM `ranks` WHERE `points`>`users`.`points` ORDER BY `rank` ASC LIMIT 1),
							(SELECT `rank` FROM `ranks` ORDER BY `rank` DESC LIMIT 1)
						)
					)
				) as `next_rank_points`
			FROM `users`
			WHERE `id`=?",
			$user
		);
		$rank['percent']=number_format($rank['points']/$rank['next_rank_points']*100,1);
		return $rank;
	}
	private function add_rank(){
		global $db;
		$rank=$db->get_row("SELECT * FROM `ranks` WHERE `rank` = (SELECT MAX(`rank`) FROM `ranks`)");
		$new_rank=$rank['rank']+1;
		$db->query(
			"INSERT INTO `ranks` (
			) VALUES (?,?)",
			array(
				$new_rank,
				floor($new_rank*($new_rank*1.75))
			)
		);
	}
}