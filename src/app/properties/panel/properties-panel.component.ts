import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';

import { PropertyService } from '../property.service';
import { PropertyEditorService } from '../property-editor.service';
import { ContainerHostDirective } from '../../shared';

@Component({
  selector: 'app-properties-panel',
  templateUrl: './properties-panel.component.pug',
  styleUrls: ['./properties-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PropertiesPanelComponent implements OnInit, OnDestroy {

  private changedSubscription: ISubscription;

  // reference to canvas element for constructing bpmnjs modeler
  @ViewChild(ContainerHostDirective)
  private canvasHost: ContainerHostDirective;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private propertyService: PropertyService,
    private editorService: PropertyEditorService
    ) {
      this.changedSubscription = this.propertyService.selectionChanged.subscribe(this.selectionChanged.bind(this));
  }

  private selectionChanged(): void {

    try {

      const selection = this.propertyService.getSelection();
      let editorComponent;

      if (selection) {
        editorComponent = this.editorService.getEditorFor(selection);
      }

      this.loadComponent(editorComponent, selection);


    } catch (err) {
      console.log(err);
    }

  }

  /**
   * Load component dynamically
   */
  private loadComponent(component: any, element: BpmnJS.IRegistryElement): void {

    const viewContainerRef = this.canvasHost.viewContainerRef;
    viewContainerRef.clear();

    if (component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = viewContainerRef.createComponent(componentFactory);

      (<any>componentRef.instance).element = element;
    }

  }

  /**
   * On init, force get selection
   */
  public ngOnInit(): void {
    this.selectionChanged();
  }


  /**
   * Free up subscription after panel destruction
   */
  public ngOnDestroy(): void {
    this.changedSubscription.unsubscribe();
  }

}
