import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayDialog } from './dialogs/day-dialog/day-dialog';
import { TaskDialog } from './dialogs/task-dialog/task-dialog';
import { UploadTasksDialog } from './dialogs/upload-tasks-dialog/upload-tasks-dialog';
import { ToolbarComponent } from './toolbar/toolbar.component';

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
    TaskDialog,
    UploadTasksDialog,
    ToolbarComponent
  ],
  entryComponents: [DayDialog, TaskDialog, UploadTasksDialog],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
