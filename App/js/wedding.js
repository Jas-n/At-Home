var wedding={
	date:'2020-10-10',
	name:'Wedding',
	init:function(){
		var wd_seconds=php.strtotime(wedding.date);
		var td_seconds=php.strtotime('now');
		var seconds	=wd_seconds-td_seconds;
		var minutes	=seconds/60;
		var hours	=minutes/60;
		var days	=Math.ceil(hours/24);
		$('.date').text('Less than '+days+' days');
		$('.days').text(php.date('d/m/Y',php.strtotime(wedding.date)));
	}
};