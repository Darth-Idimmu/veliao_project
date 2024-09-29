import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus: 'all' | 'completed' | 'pending' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Suscribirse al observable tasks$
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (this.filterStatus === 'all') {
      this.filteredTasks = this.tasks;
    } else if (this.filterStatus === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    }
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
  }

  setFilterStatus(status: 'all' | 'completed' | 'pending'): void {
    this.filterStatus = status;
    this.applyFilter();
  }
}
