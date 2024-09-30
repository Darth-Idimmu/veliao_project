import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>(this.loadTasksFromLocalStorage());
  tasks$ = this.tasks.asObservable();
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  addTask(task: Task) {
    const currentTasks = this.tasks.getValue();
    const sortedTasks = [...currentTasks, task].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    this.tasks.next(sortedTasks);
    this.saveTasksToLocalStorage(sortedTasks);
  }

  loadTasksFromStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks.next(JSON.parse(storedTasks));
    }
  }

  // Obtener las tareas desde la API y actualizar el BehaviorSubject
  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap((tasks) => {
        this.tasks.next(tasks);
        this.saveTasksToLocalStorage(tasks);  // Guardar en localStorage
      }),
      catchError(err => {
        console.error('Error fetching tasks', err);
        return [];
      })
    );
  }

  // Alternar el estado de completado de una tarea
  toggleTaskCompletion(taskId: number): void {
    const updatedTasks = this.tasks.getValue().map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.tasks.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
  }

  // Marcar una tarea como completada
  markAsCompleted(taskId: number): void {
    const updatedTasks = this.tasks.getValue().map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    this.tasks.next(updatedTasks);
    this.saveTasksToLocalStorage(updatedTasks);
  }

  // Guardar las tareas en localStorage para persistencia
  private saveTasksToLocalStorage(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  private loadTasksFromLocalStorage(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }
}
