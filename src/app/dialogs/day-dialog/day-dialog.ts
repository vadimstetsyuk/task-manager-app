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
  actualTasks: Task[];

  constructor(public dialogRef: MdDialogRef<DayDialog>,
    @Inject(MD_DIALOG_DATA) public selectedDate: string,
    private _router: Router,
    private _taskService: TaskService) {
    this.actualTasks = [];
  }

  ngOnInit() {
    this.getActualTasks();
  }

  /*
  * Delete task by id
  */
  deleteTask(task: Task) {
    let indexOfTask = this.actualTasks.indexOf(task);

    this._taskService.deleteTask(task.id)
      .subscribe((result) => {
        this.actualTasks.splice(indexOfTask, 1);
      });
  }

  /*
  * Open form for adding task
  */
  openAddDialog() {
    this.dialogRef.close();
    this._router.navigate(['/add']);
  }

  /*
  * Open form for update already existing task
  */
  openEditDialog(task: Task) {
    this.dialogRef.close();
    let editTaskUrl = ['/edit/' + task.id];

    this._router.navigate(editTaskUrl);
  }

  /*
  * Sort all tasks for selected date by priority
  */
  sortingByPriority() {
    this.actualTasks.sort((a, b) => { return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0); });
  }

  /*
  * Sort all tasks for selected date by time
  */
  sortingByTime() {
    //parsing date
    this.actualTasks.sort((a, b) => {
      return (a.start.getHours() * 60 + a.start.getMinutes() > b.start.getHours() * 60 + b.start.getMinutes())
        ? 1 :
        ((b.start.getHours() * 60 + b.start.getMinutes() > a.start.getHours() * 60 + a.start.getMinutes()) ? -1 : 0);
    });
  }

  /*
   * If day is yesterday or latest - color will be red
   * If day is today or tomorrow - color will be green
  */
  defineColorTime(task: Task): string {
    let result = "red";

    let date = task.start.getDate();
    let month = task.start.getMonth();
    let year = task.start.getFullYear();
    let hours = task.start.getHours() * 60;
    let minutes = task.start.getMinutes();
    let duration = task.duration;

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).valueOf();
    var otherDay = new Date(year, month - 1, date).valueOf();

    if (otherDay < today) { // 24*60*60*1000 BEFORE
      result = "red";
    } else { // Today and after
      result = "green";
    }

    return result;
  }

  /*
  * Get all tasks from server
  */
  getActualTasks() {
    let splittedDate = this.selectedDate.split('.');
    let day = Number(splittedDate[0]);
    let month = Number(splittedDate[1]);
    let year = Number(splittedDate[2]);

    this._taskService.getTasksByDate(day, month, year)
      .subscribe((tasks) => {
        this.actualTasks = tasks;

        this.actualTasks.forEach(task => {
          let dateTimestamp = Date.parse(task.start.toString());
          task.start = new Date(dateTimestamp);
        });
      },
      err => {
        console.log(err);
      });
  }
}