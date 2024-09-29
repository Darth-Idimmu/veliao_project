import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  addTask(task: Task) {
    const currentTasks = this.tasks.getValue();
    this.tasks.next([...currentTasks, task]);
  }

  markAsCompleted(taskId: number) {
    const updatedTasks = this.tasks.getValue().map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    this.tasks.next(updatedTasks);
  }


}
