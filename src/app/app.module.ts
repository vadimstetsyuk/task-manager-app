import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TabMenuComponent } from './calendar/tab-menu.component';
import { CalendarComponent } from './calendar/calendar-grid/calendar.component';
import { DayDialog } from './dialogs/day-dialog/day-dialog';
import { TasksListComponent } from './calendar/tasks-list/tasks-list.component';
import { AddTaskComponent } from './forms/add-task/add-task.component';
import { EditTaskComponent } from './forms/edit-task/edit-task.component';

import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TaskService } from './services/task.service';

const appRoutes: Routes = [
  { path: '', component: CalendarComponent, data: { title: 'Calendar' } },
  { path: 'add', component: AddTaskComponent, data: { title: 'Add task' } },
  { path: 'edit/:id', component: EditTaskComponent, data: { title: 'Edit task' } },
  { path: 'tasks', component: TasksListComponent, data: { title: 'Tasks' } }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ],
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarComponent,
    DayDialog,
    TabMenuComponent,
    TasksListComponent,
    AddTaskComponent,
    EditTaskComponent
  ],
  entryComponents: [DayDialog],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
