var apps={
	name:'Apps',
	init:function(){
		$('.js-log-out').click(function(){
			home.user=0;
			localStorage.removeItem('user');
			home.set_colour();
			home.load_partial('login');
		});
	}
};