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

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {
    // Cargar las tareas desde la API cuando el servicio se inicializa
    this.fetchTasks();
  }

  // Obtener las tareas desde la API
  fetchTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
      // Asigna las tareas obtenidas al BehaviorSubject
      this.tasks.next(tasks);
    });
  }

  // Agregar una nueva tarea
  addTask(task: Task): void {
    const currentTasks = this.tasks.getValue();
    this.tasks.next([...currentTasks, task]);
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
  }
}
