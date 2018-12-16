var calendar={
	initiated:	false,
	name:		'Fuel Log',
	init:function(){
		this.render();
		if(!this.initiated){
			this.watch_new_fuel();
			this.initiated=true;
		}
	},
	render:function(){
		//this.get_fuel();
	},
	get_fuel:function(){
		home.ajax('calendar','get_fuel',this.got_fuel);
	},
	got_fuel:function(json){
		if(json.status){
			var data=json.data;
			var event={};
			$('.fuel').children().remove();
			if(data.count){ 
				console.log(data);
			}
		}
	},
	watch_new_fuel:function(){
		$('main').on('click','.js-save-fuel',function(){
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