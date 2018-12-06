var calendar={
	initiated:false,
	init:function(){
		this.render();
		if(!this.initiated){
			this.watch_new_event();
			this.initiated=true;
		}
	},
	render:function(){
		this.get_event_types();
		this.get_schedule();
	},
	get_event_types:function(){
		home.ajax('calendar','get_event_types',function(json){
			for(var i=0;i<json.data.length;i++){
				$('#event-type').append('<option value="'+json.data[i].id+'">'+json.data[i].name+'</option>');
			}
		});
	},
	get_schedule:function(){
		home.ajax('calendar','get_schedule',this.got_schedule);
	},
	got_schedule:function(json){
		if(json.status){
			var data=json.data;
			var event={};
			$('.schedule').children().remove();
			if(data.count){ 
				for(var date in data.rows){
					var events=data.rows[date];
					for(var i=0;i<events.length;i++){
						event=events[i];
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
	},
	watch_new_event:function(){
		$('main').on('click','.js-save-event',function(){
			$('#modal-error').remove();
			var name		=$('#event-name').val();
			var type		=$('#event-type').val();
			var start		=$('#event-date').val();
			var recurrence	=$('#event-recurrence').val();
			if(!name || !start){
				$('.modal-body').prepend(bootstrap.alert('danger','An event must have a Name and Start Date',{id:'modal-error'}));
			}else{
				home.ajax('calendar','add_event',function(){
					$('#event_modal').modal('hide');
					$('#event-name').val('');
					$('#event-type').val('');
					$('#event-date').val('');
					$('#event-recurrence').val('');
					calendar.get_schedule();
				},{
					name		:name,
					type		:type,
					start		:start,
					recurrence	:recurrence
				});
			}
		});
	}
};