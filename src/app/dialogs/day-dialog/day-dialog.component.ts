import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './day-dialog.component.html',
  styleUrls: ['./day-dialog.component.css']
})
export class DayDialogComponent {
  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  sortMethods = [
    { value: 'byPriority', viewValue: 'By priority' },
    { value: 'byTime', viewValue: 'By time' },
  ];

  constructor(public dialogRef: MdDialogRef<DayDialogComponent>,
    @Inject(MD_DIALOG_DATA) public selectedDate: any) {
  }
}