import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { User } from '../models/person.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  users: User[] = []; // Aquí almacenamos la lista de usuarios

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      deadline: ['', Validators.required],
      user: ['', Validators.required],
      persons: this.fb.array([]) // Si tienes un FormArray para personas
    });
  }

  ngOnInit(): void {
    // Asignamos directamente los usuarios al array `users`
    this.users = this.userService.getUsers();
  }

  submitForm() {
    if (this.taskForm.valid) {
      const taskData = { ...this.taskForm.value, persons: [] }; // persons vacío por ahora
      
    }
  }

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('')]),
    });
    this.persons.push(personForm);
  }

  removePerson(index: number) {
    this.persons.removeAt(index);
  }

  addSkill(personIndex: number) {
    const person = this.persons.at(personIndex) as FormGroup;
    const skills = person.get('skills') as FormArray;
    skills.push(this.fb.control(''));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = (this.persons.at(personIndex).get('skills') as FormArray);
    skills.removeAt(skillIndex);
  }

  getSkills(personIndex: number): FormArray {
    return (this.persons.at(personIndex).get('skills') as FormArray);
  }
}
