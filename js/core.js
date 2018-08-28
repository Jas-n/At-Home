var home={
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
	watch_links:function(){
		$('a').click(function(){
			var partial=$(this).data('load');
		});
	}
};
if(typeof cordova!=='undefined'){
	document.addEventListener('deviceready',home.init,false);
}else{
	home.init();
}