import { Injectable } from '@angular/core';

import { ManagerService } from '../core';
import { ToolbarService } from '../header';

@Injectable()
export class RegisterToolbarButtonsService {

  constructor(
    private managerService: ManagerService,
    private toolbarService: ToolbarService
  ) {
  }


  public register(): void {

    this.toolbarService.add({
      group: 'File',
      index: 10,
      text: 'Export',
      icon: 'fa-arrow-circle-down',
      click: null
    });

    this.toolbarService.add({
      group: 'File',
      index: 11,
      text: 'Save changes',
      icon: 'fa-save',
      isLarge: true,
      click: null
    });

    this.toolbarService.add({
      group: 'File',
      index: 12,
      text: 'Save as ...',
      icon: 'fa-save',
      click: null
    });

  }

}
