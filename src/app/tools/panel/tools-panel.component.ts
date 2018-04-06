import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { ToolsService, ITool } from '../tools.service';
import { ContainerHostDirective } from '../../shared';


@Component({
  selector: 'app-tools-panel',
  templateUrl: './tools-panel.component.pug',
  styleUrls: ['./tools-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolsPanelComponent implements OnInit {

  // reference to canvas element for constructing bpmnjs modeler
  @ViewChild(ContainerHostDirective)
  private _canvasHost: ContainerHostDirective;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _toolsService: ToolsService
  ) { }

  /**
   * Load component dynamically
   */
  private loadComponent(component: any): void {

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);

    const viewContainerRef = this._canvasHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }


  /**
   * After view init, load active component
   */
  public ngOnInit(): void {

    const tool = this._toolsService.getActiveTool();
    if (tool) {
      this.loadComponent(tool.component);
    }

  }

  /**
   * Returns the list of registered tools
   */
  public getTools(): ITool[] {
    return this._toolsService.getTools();
  }

  /**
   * Returns true if given tool is active
   */
  public isActiveTool(tool: ITool): boolean {
    return this._toolsService.isActiveTool(tool);
  }

  /**
   * Activate tool
   */
  public activateTool(tool: ITool): void {

    this.loadComponent(tool.component);
    this._toolsService.activateTool(tool);
  }

}
