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
		
		$('.date').text(php.date('d/m/Y',php.strtotime(wedding.date)));
var t = Date.parse(wedding.date) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) % 7);
var weeks = Math.floor( t/(1000*60*60*24*7) );
$('.formatted').text('Less than '+weeks+'w, '+days+'d, '+hours+'h');
	}
};
