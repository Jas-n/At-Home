var apps={
	name:'Apps',
	init:function(){
		for(part in home.menu){
			$('#apps').append('<a class="card icon" data-load="'+part+'"><i class="fal fa-'+home.menu[part].icon+'"></i>'+home.menu[part].name+'</a>');
		}
		$('.js-log-out').click(function(){
			home.user=0;
			localStorage.removeItem('user');
			home.set_colour();
			$('footer').addClass('hidden');
			home.load_partial('login');
		});
	}
};