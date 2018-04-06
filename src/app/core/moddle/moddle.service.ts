import { Injectable } from '@angular/core';

import { ModelerProviderService } from '../modeler-provider.service';

@Injectable()
export class ModdleService {

  constructor(
    private providerService: ModelerProviderService
  ) {
  }

  private getModdle(): BpmnJS.IModdleService {
    return this.providerService.getService<BpmnJS.IModdleService>('moddle');
  }

  /**
   * Create business object and properties
   */
  public createElement($type: string, props?: any): any {
    return this.getModdle().create($type, props);
  }

  /**
   * Access to element extension elements, pass true for create
   */
  public getExtensions(element: BpmnJS.IModdleElement, create?: boolean): BpmnJS.IExtensionElements {

    if (element.extensionElements) {
      return element.extensionElements;
    } else if (!create) {
      return null;
    }

    element.extensionElements = this.createElement('bpmn:ExtensionElements');
    element.extensionElements.values = [];
    return element.extensionElements;
  }


}
