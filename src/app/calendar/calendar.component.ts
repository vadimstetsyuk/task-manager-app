import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Calendar } from '../models/Calendar';
import { Task } from '../models/Task';
import { DayDialog } from '../dialogs/day-dialog/day-dialog';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar: Calendar;
  tasks: Task[];
  selectedDate: any;

  constructor(private _dialog: MdDialog, private localStorageService: LocalStorageService) {
    this.calendar = new Calendar();
    this.tasks = [];
  }

  ngOnInit() {
    let date = new Date();
    this.calendar.currDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    this.calendar.week = [{ title: 'Monday', color: 'lightgrey' },
    { title: 'Tuesday', color: 'lightgrey' },
    { title: 'Wednesday', color: 'lightgrey' },
    { title: 'Thursday', color: 'lightgrey' },
    { title: 'Friday', color: 'lightgrey' },
    { title: 'Saturday', color: 'lightgrey' },
    { title: 'Sunday', color: 'lightgrey' }];

    this.createCalendarFromDate(this.calendar.currDate);
  }

  createCalendarFromDate(date: Date) {
    this.calendar.days = [];
    this.tasks = <Task[]>this.localStorageService.get('tasks');
    console.log(this.calendar.currDate.getFullYear() + " " + (this.calendar.currDate.getMonth() + 1) + " " + this.calendar.currDate.getDate());

    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let fDay;
    (firstDay.getDay() === 0) ? fDay = 7 : fDay = firstDay.getDay(); // fix display data when day === Sunday

    /* 
      Fill the array of days for current month
    */
    for (let i = 1, k = 1; i <= lastDay.getDate(); k++) {
      if (k < fDay) {
        this.calendar.days.push({ title: '', color: '' });
      } else {
        this.calendar.days.push({ title: i.toString(), color: '' });
        i++;
      }

      // completing row to end
      if (i > lastDay.getDate()) {
        let element = 7 - lastDay.getDay();
        if (element === 7) return;
        for (; element > 0; element--) {
          this.calendar.days.push({ title: '', color: '' });
        }
      }
    }
    this.defineColorOfTheDays();
  }

  defineColorOfTheDays() {
    // defining the color of day
    for (let i = 0; i < this.calendar.days.length; i++) {
      let countTaskForDay = 0;
      for (let j = 0; j < this.tasks.length; j++) {
        let currDate = (this.calendar.currDate.getMonth() + 1) + '.' + this.calendar.days[i].title + "." + this.calendar.currDate.getFullYear();

        if (this.tasks[j].start.toString() == currDate)
          countTaskForDay++;
      }

      if (countTaskForDay == 0) {
        this.calendar.days[i].color = 'white';
        continue;
      }

      if (countTaskForDay > 0 && countTaskForDay < 3) {
        this.calendar.days[i].color = 'green';
        continue;
      }

      if (countTaskForDay >= 3 && countTaskForDay < 6) {
        this.calendar.days[i].color = 'yellow';
        continue;
      }

      if (countTaskForDay >= 6) {
        this.calendar.days[i].color = 'red';
        continue;
      }
    }
  }

  incrementMonth() {
    this.calendar.days = [];

    if (this.calendar.currDate.getMonth() === 11) {
      this.calendar.currDate = new Date(this.calendar.currDate.getFullYear() + 1, 0,  // increment year and month
        this.calendar.currDate.getDate());
    } else {
      this.calendar.currDate = new Date(this.calendar.currDate.getFullYear(),
        this.calendar.currDate.getMonth() + 1, this.calendar.currDate.getDate());
    }
    this.createCalendarFromDate(this.calendar.currDate);
  }

  decrementMonth() {
    this.calendar.days = [];

    if (this.calendar.currDate.getMonth() === 0) {
      this.calendar.currDate = new Date(this.calendar.currDate.getFullYear() - 1, 11,  // decrement year and month
        this.calendar.currDate.getDate());
    } else {
      this.calendar.currDate = new Date(this.calendar.currDate.getFullYear(),
        this.calendar.currDate.getMonth() - 1, this.calendar.currDate.getDate());
    }
    this.createCalendarFromDate(this.calendar.currDate);
  }

  openDayDialog(day: any) {
    if (day === '') return; // if day not selectedDate

    this.selectedDate = day;

    let dialogRef = this._dialog.open(DayDialog, {
      height: '500px',
      width: '800px',
      data: (this.calendar.currDate.getMonth() + 1) + '.' + this.selectedDate + '.' + this.calendar.currDate.getFullYear()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedDate = '-'; // another value which doesn't exist in the calendar
      this.createCalendarFromDate(this.calendar.currDate);
    });
  }
}