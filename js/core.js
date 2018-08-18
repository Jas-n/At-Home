var etg={
	version:false,
	init:function(){
		// Append App Version to links
		if(typeof cordova!=='undefined'){
			cordova.getAppVersion.getVersionNumber(function (version) {
				etg.version=version;
				$('a').each(function(){
					this.href+='?utm_source=app&utm_medium='+version+'&utm_content='+$(this).find('img').attr('alt');
				});
				$('a').click(function(e){
					e.preventDefault();
					cordova.InAppBrowser.open(this.href,'_blank')
				});
			});
		}
		// Replace svg images
		$('img.svg').each(function(){
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');
			$.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');
				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}
				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');
				// Check if the viewport is set, if the viewport is not set the SVG won't scale.
				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}
				// Replace image with new SVG
				$img.replaceWith($svg);
			}, 'xml');
		});
		// Load Associates
		$.ajax({
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
		});
		$('body').on('click','.associate',function(e){
			e.preventDefault();
			cordova.InAppBrowser.open(this.href,'_blank')
		});
	}
};
if(typeof cordova!=='undefined'){
	document.addEventListener('deviceready',etg.init,false);
}else{
	etg.init();
}