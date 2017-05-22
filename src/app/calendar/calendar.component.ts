import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Calendar } from '../models/Calendar';
import { DayDialog } from '../dialogs/day-dialog/day-dialog';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar: Calendar;
  selectedDate: any;

  constructor(private _dialog: MdDialog) {
    this.calendar = new Calendar();
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
        this.calendar.days.push('');
      } else {
        this.calendar.days.push(i.toString());
        i++;
      }

      // completing row to end
      if(i > lastDay.getDate()) {
        let element = 7 - lastDay.getDay();
        if(element === 7) return;
        for(;element > 0; element--) {
          this.calendar.days.push('');
        }
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
    if(day === '') return; // if day not selectedDate

    this.selectedDate = day;

    let dialogRef = this._dialog.open(DayDialog, {
      height: '500px',
      width: '800px',
      data: this.selectedDate + '.' + (this.calendar.currDate.getMonth() + 1) + '.' + this.calendar.currDate.getFullYear()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedDate = '-'; // another value which doesn't exist in the calendar
    });
  }
}