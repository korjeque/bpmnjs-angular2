import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { ActionsService, ModelingService, BPMNTYPES } from 'app/core';
import { ViewPropertiesService } from '../job-modeler';


@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.pug',
  styleUrls: ['./palette.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaletteComponent {

  public paletteTools: any[] = [

    {
      iconClassName: 'bpmn-icon-hand-tool',
      click: this.activateHandTool.bind(this),
      isActive: this.isHandToolActive.bind(this),
      tooltip: 'Move canvas views'
    },

    {
      iconClassName: 'bpmn-icon-lasso-tool',
      click: this.activateLassoTool.bind(this),
      isActive: this.isLassoToolActive.bind(this),
      tooltip: 'Select multiple elements'
    },

    {
      iconClassName: 'bpmn-icon-space-tool',
      click: this.activateSpaceTool.bind(this),
      isActive: this.isSpaceToolActive.bind(this),
      tooltip: 'Click to select'
    },

    {
      iconClassName: 'bpmn-icon-connection-multi',
      click: this.activateConnectionTool.bind(this),
      isActive: this.isConnectionToolActive.bind(this),
      tooltip: 'Click at start and then click at end point to be connected '
    }

  ];

  public paletteGroups: any[] = [
    {
      name: 'Events',
      className: 'bpmn-events',
      default: {
        iconClassName: 'bpmn-icon-start-event-none', dataAction: BPMNTYPES.START_EVENT
      }
    },
    {
      name: 'Gateways',
      className: 'bpmn-gateways',
      default: {
        iconClassName: 'bpmn-icon-gateway-xor', dataAction: BPMNTYPES.EXCLUSIVE_GATEWAY
      }
    }
  ];


  constructor(
    private actionsService: ActionsService,
    private modelingService: ModelingService,
    private viewService: ViewPropertiesService
  ) {
  }

  public onDragStart(event: any) {

    const target = event.target;
    if (this.isActive() && target.classList[0] === 'palette-entry') {

      this.modelingService.startElement({
        event: event,
        type: target.attributes['data-action'].value,
      });
    }

    event.preventDefault();
    return false;

  }

  public isActive(): boolean {
    return this.viewService.isDesignView();
  }

  public activateHandTool(event: Event): void {
    this.actionsService.activateHandTool(event);
  }

  public isHandToolActive(): boolean {
    return this.isActive() && this.actionsService.isHandToolActive();
  }

  public activateLassoTool(event: Event): void {
    this.actionsService.activateLassoTool(event);
  }

  public isLassoToolActive(): boolean {
    return this.isActive() && this.actionsService.isLassoToolActive();
  }

  public activateSpaceTool(event: Event): void {
    this.actionsService.activateSpaceTool(event);
  }

  public isSpaceToolActive(): boolean {
    return this.isActive() && this.actionsService.isSpaceToolActive();
  }

  public activateConnectionTool(event: Event): void {
    this.actionsService.activateConnectionTool(event);
  }

  public isConnectionToolActive(): boolean {
    return this.isActive() && this.actionsService.isConnectionToolActive();
  }

}
