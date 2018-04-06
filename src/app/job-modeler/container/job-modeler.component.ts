import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  FactoryService,
  IJobDocument,
  DocumentViewMode,
} from '../../core';

import { ViewPropertiesService } from '../view-properties';
import { ContainerHostDirective } from '../../shared';



@Component({
  selector: 'app-job-modeler',
  templateUrl: './job-modeler.component.pug',
  styleUrls: ['./job-modeler.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JobModelerComponent implements AfterViewInit {

  private busy: boolean;

  // reference to canvas element for constructing bpmnjs modeler
  @ViewChild(ContainerHostDirective)
  private canvasHost: ContainerHostDirective;

  @Input()
  public readOnly: boolean;

  @Input()
  public document: IJobDocument;

  constructor(
    private factoryService: FactoryService,
    private viewService: ViewPropertiesService
  ) {
  }

  /**
   * When component has been initialized, initialize modeler
   */
  ngAfterViewInit() {

    // init modeler
    // construct blank Bpmn Modeler
    this.factoryService.createModeler(
      this.canvasHost.viewContainerRef.element.nativeElement,
      this.readOnly,
      this.document.model.xmlContent
    );

  }


  public isDesignView(): boolean {
    return this.viewService.isDesignView();
  }

  public isXmlView(): boolean {
    return this.viewService.isXmlView();
  }

  public getXml(): string {
    return this.document.model.xmlContent;
  }

  public getCode(): any {
    return this.document.code;
  }

  public isBusy(): boolean {
    return this.busy;
  }

  public onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

}
