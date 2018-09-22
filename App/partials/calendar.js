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
		console.log(json);
		if(json.status){
			$('.schedule .loading').remove();
		}
	}
};