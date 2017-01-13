import { Component } from '@angular/core';
// Service
import { TaskService } from '../../services/task.service';
// Interface
import { ITask } from '../../../task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})
export class TasksComponent {
  tasks: ITask[];
  title: string;

  constructor(private _taskService: TaskService) {
    this._taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      })
  }

  addTask(event: any) {
    event.preventDefault();
    var newTask = {
      title: this.title,
      isDone: false
    }

    this._taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });
  }

  deleteTask(id: any) {
    var tasks = this.tasks;

    this._taskService.deleteTask(id).subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < tasks.length; i++) {
            if (tasks[i]._id == id) {
              tasks.splice(i, 1);
            }
          }
        }
      });
  }
}
