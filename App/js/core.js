var home={
	id:0,
	is_app:false,
	loaded:[],
	menu:{
		calendar:{
			icon:'calendar-alt',
			name:'Calendar'
		},
		fuel:{
			icon:'gas-pump',
			name:'Fuel Log'
		},
		tasks:{
			icon:'tasks',
			name:'Lists'
		},
		splitit:{
			icon:'money-bill',
			name:'Split It'
		},
		wedding:{
			icon:'ring',
			name:'Wedding'
		}
	},
	popular:{},
	url:'https://home.jas-n.com/',
	user:0,
	init:function(){
		if(popular=localStorage.getItem('popular')){
			popular=JSON.parse(popular);
			for(var i=0;i<popular.length;i++){
				home.popular[popular[i][0]]=popular[i][1];
			}
		}
		if(home.is_app){
			this.app_init();
		}
		this.watch_links();
	},
	app_init:function(){
		console.log(cordova.file);
	},
	ajax:function(file,method,callback,data){
		$.ajax({
			dataType:'json',
			type:"POST",
			url:'https://home.jas-n.com/ajax.php',
			data:{
				class:file,
				data:data,
				method:method,
				key:'b3de695507ba629509ef810d00ca6006',
				user:home.user
			},
			success:function(json){
				localStorage.setItem('ranks',JSON.stringify(json.ranks));
				home.set_rank(json.ranks);
				callback(json);
			},
			error: function (json) {
				console.log(json.responseText);
			}
		});
	},
	load_partial:function(partial,id){
		if(id){
			home.id=id;
			$('main').attr('data-id',home.id);
		}else{
			home.id=0;
			$('main').attr('data-id',home.id);
		}
		$('main').load('partials/'+partial+'.html',function(){
			$('.breadcrumb').remove();
			$('main').attr('id',partial);
			$('.hero').attr('src','images/'+partial+'.jpeg');
			if(home.loaded.indexOf(partial)===-1){
				$('head').append('<link rel="stylesheet" href="css/'+partial+'.css">');
				$('body').append('<script src="js/'+partial+'.js"></script>');
				home.loaded.push(partial);
			}
			if($('footer .col[data-load="'+partial+'"]').length){
				$('footer .col').removeClass('active');
				$('footer .col[data-load="'+partial+'"]').addClass('active');
				if(partial!=='apps'){
					if(!home.popular[partial]){
						home.popular[partial]=0;
					}
					home.popular[partial]++;
					var sortable = [];
					for (var part in home.popular) {
						sortable.push([part,home.popular[part]]);
					}
					sortable.sort(function(a, b) {
						return b[1] - a[1];
					});
					localStorage.setItem('popular',JSON.stringify(sortable))
				}
			}
			if(typeof window[partial].init!=='undefined'){
				window[partial].init();
			}
			if(!window[partial].name){
				window[partial].name='Apps';
			}
			$('h1').text(window[partial].name);
			if(partial=='apps'){
				$('header i').addClass('hidden');
			}else{
				$('header i').removeClass('hidden');
			}
		});
	},
	ordinal:function(number){
		var j = number % 10,
        k = number % 100;
		if (j == 1 && k != 11) {
			ordinal = "st";
		}else if (j == 2 && k != 12) {
			ordinal = "nd";
		}else if (j == 3 && k != 13) {
			ordinal = "rd";
		}else{
			ordinal = "th";
		}
		return number+ordinal;
	},
	set_colour:function(user){
		var colour='ffB00D';
		if(user==1){
			colour='6f42c1';
		}else if(user==2){
			colour='007bff';
		}
		document.documentElement.style.setProperty('--border-color','#'+colour);
	},
	set_rank:function(){
		if(ranks=localStorage.getItem('ranks')){
			ranks=JSON.parse(ranks);
			percent	=ranks.percent;
			rank	=ranks.rank;
		}else{
			percent	=0;
			rank	=0;
		}
		$('footer .rank').text(rank);
		document.documentElement.style.setProperty('--percent',percent+'%');
	},
	watch_links:function(){
		this.load_partial('login');
		$('body').on('click','[data-load]',function(){
			home.load_partial($(this).data('load'),$(this).data('id'));
		});
	}
};
if(typeof cordova!=='undefined'){
	home.is_app=true;
	document.addEventListener('deviceready',home.init,false);
}else{
	home.init();
}