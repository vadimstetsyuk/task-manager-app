import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  templateUrl: './day-dialog.html',
  styleUrls: ['./day-dialog.css']
})
export class DayDialog implements OnInit {
  tasks: Task[];
  actualTasks: Task[];

  constructor(public dialogRef: MdDialogRef<DayDialog>,
    @Inject(MD_DIALOG_DATA) public selectedDate: any,
    private _router: Router,
    private _taskService: TaskService) {
    this.actualTasks = [];
  }

  ngOnInit() {
    this.tasks = this._taskService.getTasksFromLocalStorage();
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

    this._taskService.setTasksToLocalStorage(this.tasks);
  }

  openAddDialog() {
    this.dialogRef.close();
    this._router.navigate(['/add']);
  }

  openEditDialog(task) {
    this.dialogRef.close();
    let editTaskUrl = ['/edit/' + this.tasks.indexOf(task)];

    this._router.navigate(editTaskUrl);
  }

  sortingByPriority() {
    this.actualTasks.sort((a, b) => { return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0); });
  }

  sortingByTime() {
    this.actualTasks.sort((a, b) => {
      return (a.start.hours * 60 + a.start.minutes > b.start.hours * 60 + b.start.minutes)
        ? 1 :
        ((b.start.hours * 60 + b.start.minutes > a.start.hours * 60 + a.start.minutes) ? -1 : 0);
    });
  }

  defineColorTime(task: Task): string {
    let result = "red";

    // task date
    let date = task.start.date;
    let month = task.start.month;
    let year = task.start.year;
    let hours = task.start.hours * 60;
    let minutes = task.start.minutes;
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