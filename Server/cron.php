<?php include('./init.php');
for($i=0;$i<5;$i++){
	if(!$db->result_count("SELECT * FROM `ranks` WHERE `points`>(SELECT MAX(`points`) FROM `users`)")){
		# Insert new ranks
			# new rank = Max rank number+1
			# floor(new rank * (new rank * 1.75))
	}
}