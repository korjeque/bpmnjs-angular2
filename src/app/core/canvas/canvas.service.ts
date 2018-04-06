import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ModelerProviderService } from '../modeler-provider.service';


@Injectable()
export class CanvasService {

  constructor(
    private providerService: ModelerProviderService
  ) {

  }

  /**
   * Get access to BPMNJS canvas underlying service
   */
  private getCanvas(): BpmnJS.ICanvasService {
    return this.providerService.getService<BpmnJS.ICanvasService>('canvas');
  }

  /**
   * Get diagram view box
   */
  public getViewbox(): BpmnJS.ICanvasViewBox {
    return this.getCanvas().viewbox();
  }

  /**
   * Get canvas container client rect
   */
  public getClientRect(): ClientRect {
    return this.getCanvas()._container.getBoundingClientRect();
  }

  /**
   * Get diagram root element
   */
  public getRootElement(): BpmnJS.IRegistryElement {
    return this.getCanvas().getRootElement();
  }
}
