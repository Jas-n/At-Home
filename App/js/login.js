var login={
	name:'Login',
	init:function(){
		home.user=localStorage.getItem('user');
		if(home.user){
			home.set_colour(home.user);
			$('footer').removeClass('hidden');
			home.set_colour(home.user);
			var i=0;
			for(part in home.popular){
				login.add_to_footer(part);
				i++;
				if(i==5){
					break;
				}
			}
			if(i<5){
				for(part in home.menu){
					if(!home.popular[part]){
						login.add_to_footer(part);
					}
					if(i==5){
						break;
					}
				}
			}
			home.load_partial('apps');
			home.load_partial('w_guests');
		}else{
			$('.js-login').click(function(){
				home.user=this.dataset.id;
				localStorage.setItem('user',home.user);
				$('footer').removeClass('hidden');
				home.set_colour(home.user);
				home.load_partial('apps');
			});
		}
	},
	add_to_footer:function(part){
		$('footer').append('<a class="col" data-load="'+part+'"><i class="fal fa-'+home.menu[part].icon+'"></i></a>');
	}
};