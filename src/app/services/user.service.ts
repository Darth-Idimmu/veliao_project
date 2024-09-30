import { Injectable } from '@angular/core';
import { User } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersKey = 'users';

  constructor() {
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify(this.initialUsers()));
    }
  }

  private initialUsers(): User[] {
    return [
      { userId: 1, name: 'John Doe', age: 30, skills: ['Angular', 'JavaScript'] },
      { userId: 2, name: 'Jane Smith', age: 25, skills: ['CSS', 'HTML'] },
      { userId: 3, name: 'James Brown', age: 28, skills: ['TypeScript', 'NodeJS'] },
      { userId: 4, name: 'Alice Johnson', age: 35, skills: ['React', 'Python'] },
      { userId: 5, name: 'Charlie Davis', age: 22, skills: ['Vue', 'PHP'] },
      { userId: 6, name: 'Diana Miller', age: 32, skills: ['SQL', 'MongoDB'] },
      { userId: 7, name: 'Emily Wilson', age: 27, skills: ['Java', 'Spring'] },
      { userId: 8, name: 'David Anderson', age: 40, skills: ['Docker', 'Kubernetes'] },
      { userId: 9, name: 'Sophie Clark', age: 24, skills: ['C++', 'Linux'] },
      { userId: 10, name: 'Oliver Lewis', age: 29, skills: ['Go', 'AWS'] },
    ];
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  addUser(newUser: User) {
    const users = this.getUsers();
    newUser.userId = users.length + 1;
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
