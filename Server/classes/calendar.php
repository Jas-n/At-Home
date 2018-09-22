<?php class calendar{
	function __construct(){
	}
	function get_schedule(){
		global $db;
		if($count=$db->result_count("FROM `events`")){
			$rows=$db->query("SELECT * FROM `events` ORDER BY `start` ASC LIMIT ".ITEMS_PER_PAGE);
		}
		return array(
			'count'	=>$count,
			'rows'	=>$rows
		);
	}
}