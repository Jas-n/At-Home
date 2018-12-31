var w_budget={
	initiated:	false,
	name:'Wedding Budget',
	init:function(){
		this.get_budget();
		if(!this.initiated){
			this.watch_add();
			this.initiated=true;
		}
	},
	budget_html:function(item){
		return '<div class="card"><span class="float-right">&pound;'+php.number_format(item.value,2)+'</span><h3>'+item.name+'</h3></div>';
	},
	get_budget:function(){
		home.ajax('w_budget','get_budget',this.got_budget);
	},
	got_budget:function(budget){
		var i=0;
		// Summary
		$('.summary-in').html('&pound;'+php.number_format(budget.data.totals.in,2));
		$('.summary-out').html('&pound;'+php.number_format(budget.data.totals.out,2));
		$('.summary-total').html('&pound;'+php.number_format(budget.data.totals.total,2));
		// In
		$('.budget-in').html('');
		for(i=0;i<budget.data.in.length;i++){
			$('.budget-in').append(w_budget.budget_html(budget.data.in[i]));
		}
		// Out
		$('.budget-out').html('');
		for(i=0;i<budget.data.out.length;i++){
			$('.budget-out').append(w_budget.budget_html(budget.data.out[i]));
		}
	},
	watch_add:function(){
		$('main').on('click','.js-save-budget',function(){
			$('#modal-error').remove();
			var name		=$('#budget-name').val();
			var type		=$('#budget-type').val();
			var value		=$('#budget-value').val();
			if(!name || !type || !value){
				$('.modal-body').prepend(bootstrap.alert('danger','A budget item must have a Name, Type and Value',{id:'modal-error'}));
			}else{
				home.ajax('w_budget','add_budget',function(json){
					$('#budget_modal').modal('hide');
					$('#budget-name').val('');
					$('#budget-type').val('');
					$('#budget-value').val('');
					w_budget.got_budget(json);
				},{
					name	:name,
					type	:type,
					value	:value
				});
			}
		});
	}
};