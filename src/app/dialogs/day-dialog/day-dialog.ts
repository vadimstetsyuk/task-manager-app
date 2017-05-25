import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { LocalStorageService } from 'angular-2-local-storage';
import { Task } from '../../models/Task';

@Component({
  templateUrl: './day-dialog.html',
  styleUrls: ['./day-dialog.css']
})
export class DayDialog implements OnInit {
  tasks: Task[];
  actualTasks: Task[];

  constructor(public dialogRef: MdDialogRef<DayDialog>,
    @Inject(MD_DIALOG_DATA) public selectedDate: any,
    private localStorageService: LocalStorageService) {
    this.actualTasks = [];
  }

  ngOnInit() {
    this.tasks = <Task[]>this.localStorageService.get('tasks');
    if (this.tasks) {
      this.getActualTasks();
      this.sortingByPriority();
    }
  }

  getActualTasks() {
    this.actualTasks = [];

    for (let i = 0; i < this.tasks.length; i++) {
      let taskDate = this.tasks[i].start.month + '.' + this.tasks[i].start.date + '.' + this.tasks[i].start.year;
        if(taskDate === this.selectedDate)
      this.actualTasks.push(this.tasks[i]);
    }
  }

  deleteTask(task: Task) {
    let index = this.tasks.indexOf(task);

    if (index > -1)
      this.tasks.splice(index, 1);

    this.getActualTasks();

    this.localStorageService.set('tasks', this.tasks);
  }

  sortingByPriority() {
    this.actualTasks.sort((a, b) => { return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0); });
  }

  sortingByTime() {
    this.actualTasks.sort((a, b) => { return (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0); });
  }
}