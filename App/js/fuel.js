var fuel={
	initiated:	false,
	name:		'Fuel Log',
	init:function(){
		this.render();
		$('#fuel-date').val(php.date('Y-m-d'));
		if(!this.initiated){
			this.watch_new_fuel();
			this.initiated=true;
		}
	},
	render:function(){
		this.get_fuel();
	},
	get_fuel:function(){
		home.ajax('fuel','get_fuel',this.got_fuel,{user:home.user});
	},
	got_fuel:function(json){
		if(json.status){
			var logs	=json.data.logs;
			var totals	=json.data.totals;
			var log={};
			$('.fuel').children().remove();
			$('.fuel').append('<div class="card">'+
				'<h3>Totals</h3>'+
				'<div class="row">'+
					'<div class="col-6">Mileage:</div>'+
					'<div class="col-6">'+php.number_format(totals.mileage,1)+'</div>'+
					'<div class="col-6">Cost:</div>'+
					'<div class="col-6">&pound;'+php.number_format(totals.cost,2)+'</div>'+
					'<div class="col-6">Litres:</div>'+
					'<div class="col-6">'+php.number_format(totals.litres,2)+'</div>'+
				'</div>'+
			'</div>');
			for(var i=0;i<logs.length;i++){
				log=logs[i];
				$('.fuel').append('<div class="card">'+
					'<h3>'+php.formatted_date(log.date)+'</h3>'+
					'<div class="row">'+
						'<div class="col-6">Mileage:</div>'+
						'<div class="col-6">'+log.mileage+'</div>'+
						'<div class="col-6">Cost Per Litre:</div>'+
						'<div class="col-6">&pound;'+php.number_format(log.per_litre,2)+'/Litre</div>'+
						'<div class="col-6">Cost:</div>'+
						'<div class="col-6">&pound;'+php.number_format(log.cost,2)+'</div>'+
						'<div class="col-6">Litres:</div>'+
						'<div class="col-6">'+log.litres+'</div>'+
					'</div>'+
				'</div>');
			}
		}
	},
	watch_new_fuel:function(){
		$('main').on('click','.js-save-fuel',function(){
			$('#modal-error').remove();
			var date		=$('#fuel-date').val();
			var mileage		=$('#fuel-mileage').val();
			var per_litre	=$('#fuel-per-litre').val();
			var cost		=$('#fuel-cost').val();
			var litres		=$('#fuel-litres').val();
			if(!date || !mileage || !per_litre || !cost || !litres){
				$('.modal-body').prepend(bootstrap.alert('danger','Fuel must have a Date, Mileage, Cost Per Litre, Cost and Litres',{id:'modal-error'}));
			}else{
				home.ajax('fuel','add_fuel',function(){
					$('#fuel_modal').modal('hide');
					$('#fuel-date').val(php.date('Y-m-d'));
					$('#fuel-mileage').val('');
					$('#fuel-per-litre').val('');
					$('#fuel-cost').val('');
					$('#fuel-litres').val('');
					fuel.get_fuel(home.user);
				},{
					date:		date,
					mileage:	mileage,
					per_litre:	per_litre,
					cost:		cost,
					litres:		litres,
					user:		home.user
				});
			}
		});
	}
};