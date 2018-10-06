var tasks={
	initiated:false,
	init:function(){
		this.get_tasks(home.id);
		if(!this.initiated){
			this.watch_delete_task();
			this.watch_new_task();
			this.initiated=true;
		}
	},
	get_tasks:function(parent){
		if(!parent){
			parent=0;
		}
		home.ajax(
			'tasks',
			'get_tasks',
			this.got_tasks,
			{
				parent:parent
			}
		);
	},
	got_tasks:function(json){
		if(json.status){
			var data=json.data;
			$('.tasks .loading').remove();
			$('.tasks .new-task').removeClass('hidden');
			if(Number(data.count)){
				for(var i=0;i<data.rows.length;i++){
					tasks.render_task(data.rows[i]);
				}
			}
		}
	},
	render_task:function(task){
		if(task.data){
			task=task.data;
		}
		var task_html='<div class="list-group-item task" data-load="tasks" data-id="'+task.id+'">';
			if(!Number(task.children_count)){
				task_html+='<a class="btn btn-sm btn-danger float-right text-white js-delete-task"><i class="fal fa-times"></i></a>';
			}
			task_html+=`<h3>`+task.description+`</h3>
		</div>`;
		$('.new-task').before(task_html);
		$('#new-task-field').val('');
	},
	watch_delete_task:function(){
		$('main').on('click','.js-delete-task',function(e){
			home.ajax('tasks','delete_task',function(data){
				if(data.status){
					$('.task[data-id="'+data.data+'"]').remove();
				}
			},{
				id:$(e.target.parentNode).data('id')
			});
			return false;
		});
	},
	watch_new_task:function(){
		$('main').on('click','.js-add-task',function(){
			home.ajax('tasks','add_task',tasks.render_task,{
				description:$('#new-task-field').val(),
				parent:$('main').data('id')
			});
		});
	}
};