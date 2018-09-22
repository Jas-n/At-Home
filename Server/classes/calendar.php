<?php class calendar{
	public $start;
	function __construct(){
		$this->start=date('Y-m-d');
	}
	function get_schedule(){
		global $db;
	}
}