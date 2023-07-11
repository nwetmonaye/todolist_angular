import { Component, OnInit } from '@angular/core';

interface Task {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  taskInput: any;
  tasks: Task[] = [];

  ngOnInit() {
    const data = localStorage.getItem('data');
    this.tasks = data ? JSON.parse(data) : [];
  }

  addTask() {
    if (this.taskInput === '') {
      alert('You must write something!');
    } else {
      const newTask: Task = { name: this.taskInput, checked: false };
      this.tasks.push(newTask);
      this.saveData();
    }
    this.taskInput = '';
  }

  removeTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveData();
    }
  }

  toggleTaskStatus(task: Task) {
    task.checked = !task.checked;
    this.saveData();
  }

  saveData() {
    localStorage.setItem('data', JSON.stringify(this.tasks));
  }
}
