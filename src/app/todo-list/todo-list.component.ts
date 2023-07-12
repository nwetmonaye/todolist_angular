import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  taskText: string;
  tasks: { text: string; checked: boolean }[];

  constructor() {
    this.taskText = '';
    this.tasks = [];
  }

  toggleCheck(task: any) {
    task.checked = !task.checked;
    this.saveData();
  }
  addTask() {
    if (this.taskText === '') {
      alert('You must write something!');
    } else {
      this.tasks.push({ text: this.taskText, checked: false });
      this.saveData();
    }
    this.taskText = '';
  }

  removeTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.saveData();
    }
  }

  saveData() {
    localStorage.setItem('data', JSON.stringify(this.tasks));
  }

  ngOnInit() {
    this.showTasks();
  }

  showTasks() {
    const data = localStorage.getItem('data');
    if (data) {
      this.tasks = JSON.parse(data).map((task: any) => {
        return { text: task.text, checked: task.checked };
      });
    }
  }
}
