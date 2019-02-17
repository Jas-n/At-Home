<?php include('./includes/includes.php');
$db		=new database;
$ranks	=new ranks;
$settings=$db->query("SELECT * FROM `settings`");
foreach($settings as $setting){
	define(strtoupper($setting['name']),$setting['value']);
}