var apps={
	name:'Apps',
	init:function(){
		for(part in home.menu){
			$('#apps').append(
				'<div class="card icon" data-load="'+part+'">'+
					'<div class="title">'+
						'<i class="fal fa-'+home.menu[part].icon+'"></i>'+
						home.menu[part].name+
					'</div>'+
					'<div class="details">'+
					'</div>'+
				'</div>'
			);
		}
		home.ajax(
			'app',
			'app_details',
			function(json){
				for(app in json.data){
					$('.card[data-load="'+app+'"] .details').html(json.data[app]);
				}
			}
		);
		$('.js-log-out').click(function(){
			home.user=0;
			localStorage.removeItem('user');
			home.set_colour();
			$('footer').addClass('hidden');
			home.load_partial('login');
		});
	}
};