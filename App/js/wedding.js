var wedding={
	date:'2020-10-10 15:00:00',
	name:'Wedding',
	init:function(){
		var wd_seconds=php.strtotime(wedding.date);
		var td_seconds=php.strtotime('now');
		var seconds	=wd_seconds-td_seconds;
		var minutes	=seconds/60;
		var hours	=minutes/60;
		var days	=Math.ceil(hours/24);
		$('.days').text('Less than '+days+' days');
		$('.formatted').text('Less than '+days+' days, '+hours+' hours');
		$('.date').text(php.date('d/m/Y',php.strtotime(wedding.date)));
	}
};
