import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { JobManagerModule } from './job-manager';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JobManagerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
