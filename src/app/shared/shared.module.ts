import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AceEditorModule } from 'ng2-ace-editor';
import { HttpClientModule } from '@angular/common/http';

import { CodeEditorComponent, ContainerHostDirective, ScrollDirective } from './directives';
import { SortByPipe } from './pipes';
import { RequestService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AceEditorModule
  ],
  declarations: [
    CodeEditorComponent,
    ContainerHostDirective,
    SortByPipe,
    ScrollDirective
  ],
  providers: [
    RequestService
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CodeEditorComponent,
    ContainerHostDirective,
    SortByPipe,
    ScrollDirective
  ]
})
export class SharedModule { }
