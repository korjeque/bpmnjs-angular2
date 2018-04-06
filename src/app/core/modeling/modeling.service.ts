import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CanvasService } from '../canvas';
import { ModelerProviderService } from '../modeler-provider.service';

/**
 * Base command for creating elements in BPMN diagram
 */
interface IBaseCreateOptions {

  /**
   * One of the valid bpmn:types
   */
  type: string;

  /**
   * Optional creating function, to add annotations to the newly element and correctly support undo/redo operation
   */
  onCreating?: (e: BpmnJS.IRegistryElement) => void;
}


/**
 * Command used for create a new element at specific position
 */
export interface ICreateElementOptions extends IBaseCreateOptions {

  // where we want the element to be placed
  x: number;
  y: number;

}

/**
 * Command used for start dragging a new element
 */
export interface IStartElementOptions extends IBaseCreateOptions {
  /**
   * Required, mouse event for start dragging
   */
  event: any;
}

/**
 * Command used for updating elements with undo/redo support
 */
export interface IUpdateElementOptions {

  element: BpmnJS.IRegistryElement;

  // the property and its new value
  propertyName: string;
  propertyValue: any;
}



@Injectable()
export class ModelingService {

  constructor(
    private providerService: ModelerProviderService,
    private canvasService: CanvasService
  ) {
  }

  private getModeling(): BpmnJS.IModelingService {
    return this.providerService.getService<BpmnJS.IModelingService>('modeling');
  }

  private getDragging(): BpmnJS.IDraggingService {
    return this.providerService.getService<BpmnJS.IDraggingService>('dragging');
  }

  private getElementFactory(): BpmnJS.IElementFactory {
    return this.providerService.getService<BpmnJS.IElementFactory>('elementFactory');
  }

  /**
   * Create new element at specific position
   */
  public createElement(options: ICreateElementOptions): void {
    const parent: BpmnJS.IRegistryElement = this.canvasService.getRootElement();
    const elementFactory: BpmnJS.IElementFactory = this.getElementFactory();
    const modeling: BpmnJS.IModelingService = this.getModeling();
    const shape: BpmnJS.IRegistryElement = elementFactory.createShape({ type: options.type });

    const viewbox: BpmnJS.ICanvasViewBox = this.canvasService.getViewbox();
    const clientRect = this.canvasService.getClientRect();

    if (options.onCreating) {
      options.onCreating(shape);
    }

    modeling.createShape(
      shape,
      {
        x: viewbox.x + (options.x - clientRect.left) / viewbox.scale,
        y: viewbox.y + (options.y - clientRect.top) / viewbox.scale
      },
      parent
    );

  }

  /**
   * Create new element by drag and drop
   */
  public startElement(options: IStartElementOptions): void {

    const elementFactory: BpmnJS.IElementFactory = this.getElementFactory();
    const shape: BpmnJS.IRegistryElement =
      options.type === 'ParticipantShape'
        ? elementFactory.createParticipantShape()
        : elementFactory.createShape({ type: options.type });

    const dragService: BpmnJS.IDraggingService = this.getDragging();

    if (options.onCreating) {
      options.onCreating(shape);
    }

    dragService.init(options.event, 'create', {
      cursor: 'grabbing',
      autoActivate: false, // if we use true, mpm drop throws error, ??
      threshold: 10,
      data: {
        shape: shape,
        context: {
          shape: shape,
          source: null
        }
      }
    });
  }

  /**
   * Update existing element with undo/redo support
   */
  public updateElement(options: IUpdateElementOptions): void {

    const modeling: BpmnJS.IModelingService = this.getModeling();
    const element: BpmnJS.IRegistryElement = options.element;
    const propertyName: string = options.propertyName;
    const propertyValue: any = options.propertyValue;

    // is resize,move?
    if (/^(x|y|width|height)$/.test(propertyName)) {

      if (propertyName === 'x') {
        modeling.moveElements([element], { x: propertyValue - element.x, y: 0 });
      } else if (propertyName === 'y') {
        modeling.moveElements([element], { x: 0, y: propertyValue - element.y });
      } else if (propertyName === 'width' || propertyName === 'height') {
        modeling.resizeShape(element, {
          x: element.x, y: element.y,
          width: parseInt((propertyName === 'width' ? propertyValue : element.width), 0),
          height: parseInt((propertyName === 'height' ? propertyValue : element.height), 0),
        });
      }

    } else {

      const property: any = {};
      property[propertyName] = propertyValue;

      if (/^(fill|stroke)$/.test(propertyName)) {
        modeling.setColor(element, property);
      } else {
        modeling.updateProperties(element, property);
      }

    }

  }

}
