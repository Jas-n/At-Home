var apps={
	name:'Apps',
	init:function(){
		$('.js-log-out').click(function(){
			home.user=0;
			localStorage.removeItem('user');
			home.set_colour();
			$('footer').addClass('hidden');
			home.load_partial('login');
		});
	}
};