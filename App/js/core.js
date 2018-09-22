var home={
	loaded:[],
	url:'https://home.jas-n.com/',
	init:function(){
		this.watch_links();
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
				key:'b3de695507ba629509ef810d00ca6006'
			},
			success:function(json){
				callback(json);
			},
			error: function (json) {
				console.log(json.responseText);
			}
		});
	},
	load_partial:function(partial,id){
		$('main').load('partials/'+partial+'.html',function(){
			if(home.loaded.indexOf(partial)===-1){
				$('head').append('<link rel="stylesheet" href="css/'+partial+'.css">');
				$('body').append('<script src="js/'+partial+'.js"></script>');
				$('main').attr('id',partial);
				home.loaded.push(partial);
			}
			window[partial].init();
		});
	},
	watch_links:function(){
		this.load_partial($('footer a:first-of-type').data('load'));
		$('body').on('click','a',function(){
			home.load_partial($(this).data('load'));
		});
	}
};
if(typeof cordova!=='undefined'){
	document.addEventListener('deviceready',home.init,false);
}else{
	home.init();
}