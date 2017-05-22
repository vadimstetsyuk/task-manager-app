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

  sortMethods = [
    { value: 'byPriority', viewValue: 'By priority' },
    { value: 'byTime', viewValue: 'By time' },
  ];

  constructor(public dialogRef: MdDialogRef<DayDialog>,
    @Inject(MD_DIALOG_DATA) public selectedDate: any,
    private localStorageService: LocalStorageService) {
    this.actualTasks = [];
  }

  ngOnInit() {
    this.tasks = <Task[]>this.localStorageService.get('tasks');
    this.getActualTasks();
  }

  getActualTasks() {
    this.actualTasks = [];
    
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].start === this.selectedDate)
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
}