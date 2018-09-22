var home={
	loaded:[],
	url:'https://home.jas-n.com/',
	init:function(){
		this.watch_links();
		/*$.ajax({
			dataType:'json',
			type:"POST",
			url:'https://etg.glowt.co.uk/api/558ba1abdef0f00862e0be388da42619/module/products/manufacturers',
			data:{},
			success:function(data){
				var m={};
				var m_html='<div class="row associates">';
				for(var id in data.data){
					m=data.data[id];
					m_html+='<a class="col-6 associate" href="https://www.engtechgroup.com/associate/'+m.slug+'/">';
						if(m.colour_logo){
							m_html+='<img alt="'+m.name+'" src="'+(m.colour_logo.logo?m.colour_logo.logo:m.colour_logo.thumb)+'">';
						}else{
							m_html+=m.name;
						}
					m_html+='</a>';
				}
				m_html+='</div>';
				$('main').append(m_html);
			}
		});*/
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
			}
		});
	},
	load_partial:function(partial){
		$('main').load('partials/'+partial+'.html',function(){
			if(home.loaded.indexOf(partial)===-1){
				$('body').append('<script src="partials/'+partial+'.js"></script>');
				home.loaded.push(partial);
			}
			window[partial].init();
		});
	},
	watch_links:function(){
		this.load_partial($('footer a:first-of-type').data('load'));
		$('a').click(function(){
			home.load_partial($(this).data('load'));
		});
	}
};
if(typeof cordova!=='undefined'){
	document.addEventListener('deviceready',home.init,false);
}else{
	home.init();
}