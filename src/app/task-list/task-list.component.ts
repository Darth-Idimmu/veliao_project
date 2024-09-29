import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter = 'all'; // Default to show all tasks

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  markAsCompleted(taskId: number) {
    this.taskService.markAsCompleted(taskId);
  }

  applyFilter() {
    if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter((task) => task.completed);
    } else if (this.filter === 'pending') {
      this.filteredTasks = this.tasks.filter((task) => !task.completed);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
  }

  setFilterStatus(status: 'all' | 'completed' | 'pending'): void {
    this.filter = status;
    this.applyFilter();
  }
  
}
