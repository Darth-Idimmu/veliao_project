import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { User } from '../models/person.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  personForm: FormGroup;
  nextUserId: number = 11;

  users = [
    { userId: 1, name: 'John Doe', age: 28, skills: ['Angular', 'TypeScript'] },
    { userId: 2, name: 'Jane Smith', age: 32, skills: ['JavaScript', 'React'] },
    { userId: 3, name: 'Mike Johnson', age: 45, skills: ['Python', 'Django'] },
    { userId: 4, name: 'Sarah Brown', age: 26, skills: ['NodeJS', 'Express'] },
    { userId: 5, name: 'Chris Davis', age: 30, skills: ['C++', 'Qt'] },
    { userId: 6, name: 'Anna White', age: 35, skills: ['Java', 'Spring Boot'] },
    { userId: 7, name: 'Tom Clark', age: 40, skills: ['Ruby', 'Rails'] },
    { userId: 8, name: 'Laura Green', age: 29, skills: ['PHP', 'Laravel'] },
    { userId: 9, name: 'Sam Wilson', age: 34, skills: ['Go', 'Kubernetes'] },
    { userId: 10, name: 'Emily Turner', age: 27, skills: ['Flutter', 'Dart'] }
  ];

  constructor(private fb: FormBuilder) {
    this.personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)])
    });
  }

  get skills() {
    return this.personForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  addPerson() {
    if (this.personForm.valid) {
      const newPerson: User = { userId: this.nextUserId++, ...this.personForm.value };
      this.users.push(newPerson);
      this.personForm.reset();
    }
  }
} 