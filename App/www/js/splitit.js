var splitit={
	discount:	0,
	discount_all:false,
	initiated:	false,
	items:		{},
	init:function(){
		if(!this.initiated){
			this.watch_clear();
			this.watch_delete();
			this.watch_discountable();
			this.watch_validation();
			this.watch_payment();
			this.render_items();
			this.initiated=true;
		}
	},
	calculate_discount:function(sale,discountable){
		sale=Number(sale);
		if(discountable || this.discount_all){
			sale=sale-(sale/100*this.discount);
		}
		return Number(sale.toFixed(2));
	},
	render_items:function(){
		var a_total		=0;
		var a_discounted=0;
		var html		='';
		var i			=0;
		var items		={};
		var n_total		=0;
		var n_discounted=0;
		var n_total		=0;
		var n_discounted=0;
		if(names=localStorage.getItem('splitit')){
			splitit.items=names;
			splitit.items=JSON.parse(splitit.items);
			// Foreach items as name
			for(name in splitit.items){
				i			=0;
				items		=splitit.items[name];
				n_total		=0;
				n_discounted=0;
				if(Object.keys(items).length){
					html+='<div class="card shadow mb-3 name_group" data-name="'+name+'">'+
						'<h3 class="mx-2 mt-2">'+name+'</h3>'+
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
								// FOreach items as item
								for(item in items){
									item_data=items[item];
									quantity=item_data.quantity;
									cost	=Number(item_data.cost);
									line	=cost*quantity;
									d_cost	=this.calculate_discount(cost,item_data.discountable);
									d_line	=d_cost*quantity;
									html+='<tr>'+
										'<td>'+(++i)+'</td>'+
										'<td>'+item+'</td>'+
										'<td class="text-right">';
											if(cost!=d_cost){
												html+='<del>&pound;'+php.number_format(cost,2)+'</del><br>';
											}
											html+='&pound;'+php.number_format(d_cost,2)+
										'</td>'+
										'<td class="text-right">'+quantity+'</td>'+
										'<td class="text-right">';
											if(cost!=d_cost){
												html+='<del>&pound;'+php.number_format(cost*quantity,2)+'</del><br>';
											}
											html+='&pound;'+php.number_format(d_line,2)+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td class="text-center" colspan="5">'+
											'<a class="btn btn-info btn-sm text-white js-discountable" data-name="'+name+'" data-item="'+item+'">Discountable</a> '+
											'<a class="btn btn-danger btn-sm text-white js-remove-item" data-name="'+name+'" data-item="'+item+'">Remove</a>'+
										'</td>'
									'</tr>';
									n_total		+=line;
									n_discounted+=d_line;
								}
							html+='</tbody>'+
							'<tfoot>'+
								'<tr>'+
									'<th class="text-right" colspan="4">Total</th>'+
									'<th class="text-right">&pound;'+php.number_format(n_discounted,2)+'</th>'+
								'</tr>'+
							'</tfoot>'+
						'</table>'+
					'</div>';
				}
				a_total		+=n_total;
				a_discounted+=n_discounted;
			}
			$('.sub-total').html('&pound;'+php.number_format(a_total,2));
			$('.discount-value').html('&pound;'+php.number_format(a_total-a_discounted,2));
			$('.total').html('&pound;'+php.number_format(a_discounted,2));
		}
		$('.breakdown').html(html);
	},
	store_item:function(){
		var name		=$('#who').val();
		var item		=$('#what').val();
		var cost		=$('#cost').val();
		var discountable=$('#discountable:checked').length?true:false;
		var quantity	=$('#quantity').val();
		if(!splitit.items[name]){
			splitit.items[name]={};
		}
		splitit.items[name][item]={
			cost:cost,
			discountable:discountable,
			quantity:quantity
		};
		localStorage.setItem('splitit',JSON.stringify(splitit.items));
		splitit.render_items();
	},
	watch_clear:function(){
		$('.js-clear-items').click(function(){
			localStorage.removeItem('splitit');
			splitit.render_items();
		});
	},
	watch_delete:function(){
		$('.breakdown').on('click','.js-remove-item',function(){
			var item=this.dataset.item;
			var name=this.dataset.name;
			delete splitit.items[name][item];
			localStorage.setItem('splitit',JSON.stringify(splitit.items));
			splitit.render_items();
		});
	},
	watch_discountable:function(){
		$('.breakdown').on('click','.js-discountable',function(){
			var item=this.dataset.item;
			var name=this.dataset.name;
			splitit.items[name][item].discountable=!splitit.items[name][item].discountable;
			localStorage.setItem('splitit',JSON.stringify(splitit.items));
			splitit.render_items();
		});
	},
	watch_payment:function(){
		$('#discount').keyup(function(){
			splitit.discount=this.value;
			splitit.render_items();
		});
		$('#discount-all').change(function(){
			splitit.discount_all=this.checked;
			splitit.render_items();
		});
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