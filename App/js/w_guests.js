var w_guests={
	initiated:	false,
	name:'Wedding Guests',
	init:function(){
		this.get_guests();
		if(!this.initiated){
			this.watch_add();
			this.initiated=true;
		}
	},
	get_guests:function(){
		home.ajax('w_guests','get_guests',this.got_guests);
	},
	got_guests:function(guests){
		var i=0;
		var guest={};
		console.log(guests.data.totals);
		$('.summary td.adults').text(guests.data.totals.adults);
		$('.summary td.children').text(guests.data.totals.children);
		$('.summary td.ceremony').text(guests.data.totals.ceremony);
		$('.summary td.evening').text(guests.data.totals.evening);
		$('.summary td.total').text(guests.data.totals.total);
		$('.guest-list tbody').html('');
		for(i=0;i<guests.data.guests.length;i++){
			guest=guests.data.guests[i];
			$('.guest-list tbody').append('<tr><th>'+guest.name+'</th><td>'+(guest.type==1?'Adult':'Child')+'</td><td class="text-center">'+(guest.type==1 || guest.type==2?'<i class="fal fa-check"></i>':'')+'</td><td class="text-center">'+(guest.time==1?'<i class="fal fa-check"></i>':'')+'</td></tr>');
		}
	},
	watch_add:function(){
		$('main').on('click','.js-save-guest',function(){
			$('#modal-error').remove();
			var name		=$('#guest-name').val();
			var type		=$('#guest-type').val();
			var time		=$('#guest-time').val();
			if(!name || !type || !time){
				$('.modal-body').prepend(bootstrap.alert('danger','A guest must have a Name, Type and Time',{id:'modal-error'}));
			}else{
				home.ajax('w_guests','add_guest',function(json){
					$('#guest_modal').modal('hide');
					$('#guest-name').val('');
					$('#guest-type').val('');
					$('#guest-time').val('');
					w_guests.got_guests(json);
				},{
					name:name,
					type:type,
					time:time
				});
			}
		});
	}
};