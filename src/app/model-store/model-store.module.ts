import { NgModule } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'app/shared';

import { NewJobPopupComponent } from './new-job-popup';
import { OpenJobPopupComponent } from './open-job-popup';

import { ManagerService } from '../core';
import { ToolbarService } from '../header';

@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    NewJobPopupComponent,
    OpenJobPopupComponent
  ],
  declarations: [
    NewJobPopupComponent,
    OpenJobPopupComponent
  ]
})

export class ModelStoreModule {

  constructor(
    private managerService: ManagerService,
    private toolbarService: ToolbarService,
    private modalService: NgbModal
  ) {

    this.toolbarService.add({
      group: 'File',
      text: 'New job',
      index: 0,
      icon: 'fa-file-o',
      isLarge: true,
      click: () => {

        this.modalService
        .open(NewJobPopupComponent).result
        .then((result) => {
          this.managerService.openDocument(result.job);
        }, () => {});

      }
    });


    this.toolbarService.add({
      group: 'File',
      index: 1,
      text: 'Open',
      beginSeparator: true,
      icon: 'fa-folder-open-o',
      click: () => {

        this.modalService
        .open(OpenJobPopupComponent, { windowClass: 'flex-modal' }).result
        .catch()
        .then((result) => {
          this.managerService.openDocument(result.job);
        }, () => {});

      }
    });

  }

}
