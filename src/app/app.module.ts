import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DayDialogComponent } from './dialogs/day-dialog/day-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
 
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MdNativeDateModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    CalendarComponent,
    DayDialogComponent,
    TaskDialogComponent,
    ToolbarComponent
  ],
  entryComponents: [DayDialogComponent, TaskDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
