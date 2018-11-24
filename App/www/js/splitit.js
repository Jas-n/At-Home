var splitit={
	initiated:false,
	items:{},
	init:function(){
		if(!this.initiated){
			this.watch_validation();
			this.renderitems();
			this.initiated=true;
		}
	},
	renderitems:function(){
		if(splitit.items=localStorage.getItem('splitit')){
			splitit.items=JSON.parse(splitit.items);
			var html='';
			var data={};
			var i=0;
			var items={};
			var total=0;
			for(name in splitit.items){
				items=splitit.items[name];
				i=0;
				total=0;
				$('.'+name).remove()
				html+='<div class="'+name+'">'+
					'<h3>'+name+'</h3>'+
					'<div class="card shadow mb-3">'+
						'<table class="table">'+
							'<thead>'+
								'<tr>'+
									'<th>#</th>'+
									'<th>Item</th>'+
									'<th class="text-right">Cost</th>'+
									'<th class="text-right">Quantity</th>'+
									'<th class="text-right">Line</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody>';
								for(item in items){
									data=items[item];
									html+='<tr>'+
										'<td>'+(i+1)+'</td>'+
										'<td>'+item+'</td>'+
										'<td class="text-right">&pound;'+Number(data.cost).toFixed(2)+'</td>'+
										'<td class="text-right">'+data.quantity+'</td>'+
										'<td class="text-right">&pound;'+(data.cost*data.quantity).toFixed(2)+'</td>'+
									'</tr>';
									total+=data.cost*data.quantity;
								}
							html+='</tbody>'+
							'<tfoot>'+
								'<tr>'+
									'<th class="text-right" colspan="4">Total</th>'+
									'<th class="text-right">&pound;'+total.toFixed(2)+'</th>'+
								'</tr>'+
							'</tfoot>'+
						'</table>'+
					'</div>'+
				'</div>';
				console.log(items);
			}
			$('.breakdown').prepend(html);
		}
	},
	store_item:function(){
		var name	=$('#who').val();
		var item	=$('#what').val();
		var cost	=$('#cost').val();
		var quantity=$('#quantity').val();
		if(!splitit.items[name]){
			splitit.items[name]={};
		}
		splitit.items[name][item]={
			cost:cost,
			quantity:quantity
		};
		localStorage.setItem('splitit',JSON.stringify(splitit.items));
		splitit.renderitems();
	},
	watch_validation:function(){
		var forms=document.getElementsByClassName('needs-validation');
		var validation=Array.prototype.filter.call(forms,function(form){
			form.addEventListener('submit', function(event) {
				if (form.checkValidity() === false) {
			  		form.classList.add('was-validated');
				}else{
					splitit.store_item();
				}
				event.preventDefault();
				event.stopPropagation();
			}, false);
		});
	}
};