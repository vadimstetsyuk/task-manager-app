import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayDialog } from './dialogs/day-dialog/day-dialog';
import { AddTaskDialog } from './dialogs/add-task-dialog/add-task-dialog';
import { EditTaskDialog } from './dialogs/edit-task-dialog/edit-task-dialog';
import { UploadTasksDialog } from './dialogs/upload-tasks-dialog/upload-tasks-dialog';
import { TasksListComponent } from './tasks-list/tasks-list.component';

import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';

import { TaskService } from './services/task.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
    ],
  declarations: [
    AppComponent,
    CalendarComponent,
    DayDialog,
    AddTaskDialog,
    EditTaskDialog,
    UploadTasksDialog,
    TasksListComponent
  ],
  entryComponents: [DayDialog, AddTaskDialog, EditTaskDialog, UploadTasksDialog],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
