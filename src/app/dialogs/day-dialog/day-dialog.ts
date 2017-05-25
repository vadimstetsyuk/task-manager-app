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
    }
  }

  getActualTasks() {
    this.actualTasks = [];

    for (let i = 0; i < this.tasks.length; i++) {
      let taskDate = this.tasks[i].start.month + '.' + this.tasks[i].start.date + '.' + this.tasks[i].start.year;
      if (taskDate === this.selectedDate)
        this.actualTasks.push(this.tasks[i]);
    }
    this.sortingByPriority();
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

  defineColorTime(task: Task): string {
    let result = "red";

    // task date
    let date = Number(task.start.date);
    let month = Number(task.start.month);
    let year = Number(task.start.year);
    let hours = Number(task.start.hours) * 60;
    let minutes = Number(task.start.minutes);
    let duration = task.duration;

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
    var otherDay = new Date(year, month - 1, date).valueOf();

    if (otherDay < today) { // 24*60*60*1000 BEFORE
      result = "red";
    } else { // Today and after
        result = "green";
    }

    return result;
  }
}