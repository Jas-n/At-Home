var calendar={
	init:function(){
		this.render();
	},
	render:function(){
		this.get_schedule();
	},
	get_schedule:function(){
		home.ajax('calendar','get_schedule',this.got_schedule);
	},
	got_schedule:function(json){
		if(json.status){
			var data=json.data;
			var event={};
			$('.schedule .loading').remove();
			if(data.count){ 
				for(var i=0;i<data.rows.length;i++){
					event=data.rows[i];
					var event_html=`<div class="list-group-item event">
						<h3>`+php.formatted_date(event.next)+` <small class="text-muted">`+event.name+`</small></h3>
						<div class="description">`;
							if(event.recurrence){
								event_html+=home.ordinal(event.count)+` occurrence<br>`;
							}
							event_html+=event.description+
						`</div>
					</div>`;
					$('.schedule').append(event_html);
				}
			}
		}
	}
};