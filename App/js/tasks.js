var tasks={
	init:function(){
		this.get_tasks();
	},
	get_tasks:function(){
		home.ajax('tasks','get_tasks',this.got_tasks);
	},
	got_tasks:function(json){
		if(json.status){
			var data=json.data;
			var task={};
			$('.tasks .loading').remove();
			if(data.count){
				for(var i=0;i<data.rows.length;i++){
					task=data.rows[i];
					console.log(task);
					if(task.children){
						$('.tasks').append(`<a class="list-group-item task" data-load="task" data-id="`+task.id+`">
							<h3>`+task.description+`</h3>
						</a>`);
					}else{
						$('.tasks').append(`<div class="list-group-item task">
							<h3>`+task.description+`</h3>
						</div>`);
					}
				}
			}
		}
	}
};