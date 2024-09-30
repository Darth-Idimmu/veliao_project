import { User } from "./person.model";

export interface Task {
  id: number; // Para permitir tareas sin ID (asignado luego)
  title: string;
  deadline: Date;
  user: number; // userId de la persona asignada
  persons: User[]; // Lista de usuarios
  completed?: boolean; // Estado opcional
}
