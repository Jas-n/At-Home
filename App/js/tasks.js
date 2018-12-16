var tasks={
	initiated:false,
	name:'Tasks',
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
			$('.breadcrumb').remove();
			if(data.task){
				$('h1').text(data.task.description);
				var links=[{
					load:'tasks',
					name:'Tasks'
				}];
				if(data.task.parents){
					var parents=data.task.parents;
					for(var i=0;i<parents.length;i++){
						links.push({
							id:parents[i].id,
							load:'tasks',
							name:parents[i].description
						});
					}
				}
				links.push({
					id:data.task.id,
					load:'tasks',
					name:data.task.description
				});
				console.log(links);
				$('h1').after(bootstrap.breadcrumb(links));
			}
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
		var task_html='<div class="card task" data-load="tasks" data-id="'+task.id+'">';
			if(!Number(task.children_count)){
				task_html+='<a class="btn btn-sm btn-danger float-right text-white js-delete-task fal fa-times"></a>';
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
			var task=$('#new-task-field').val();
			if(task){
				home.ajax('tasks','add_task',tasks.render_task,{
					description:$('#new-task-field').val(),
					parent:$('main').attr('data-id')
				});
			}
		});
	}
};