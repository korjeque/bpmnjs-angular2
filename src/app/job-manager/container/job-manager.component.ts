import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { ContainerHostDirective } from '../../shared';

import {
  ManagerService,
  IJobDocument
} from '../../core';

@Component({
  selector: 'app-job-manager',
  templateUrl: './job-manager.component.pug',
  styleUrls: ['./job-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobManagerComponent {

  constructor(
    private managerService: ManagerService
  ) {

  }


  public isSelected(model: IJobDocument): boolean {
    return this.managerService.isSelectedDocument(model);
  }

  public getDocuments(): IJobDocument[] {
    return this.managerService.getDocuments();
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown($event: any) {
    // TODO: Hack to fix issue with Zone and BpmnJS keydown event
    const document = this.managerService.getCurrentDocument();
    if (document) {
      (<any>document.modeler.get('keyboard'))._keyHandler($event);
    }
  }

  public selectDocument(model: IJobDocument): void {
    this.managerService.selectDocument(model);
  }

  public closeDocument(model: IJobDocument): void {
    this.managerService.closeDocument(model);
  }


}
