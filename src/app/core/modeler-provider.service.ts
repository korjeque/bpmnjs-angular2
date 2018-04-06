import { Injectable } from '@angular/core';

import { ManagerService } from './manager';


@Injectable()
export class ModelerProviderService {

  constructor(
    private managerService: ManagerService
  ) {
  }


  public isAvailable(): void {
  }


  public canGetService(): boolean {
    return this.managerService.getCurrentDocument() != null;
  }

  /**
   * Get access to underlying BpmnJS service
   * @param serviceId
   */
  public getService<T>(serviceId: string): T {
    const document = this.managerService.getCurrentDocument();

    if (!document) {
      throw Error('BpmnJS service not available, no job model');
    }

    return document.modeler.get<T>(serviceId);
  }
}
