import { Person } from "./person.model";

export interface Task {
  id: number;
  title: string;
  deadline: Date;
  completed: boolean;
  persons: Person[];
}

