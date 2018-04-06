import { Injectable } from '@angular/core';

import {
  ManagerService,
  DocumentViewMode
} from 'app/core';

@Injectable()
export class ViewPropertiesService {

  constructor(
    private managerService: ManagerService
  ) {
  }

  /**
   * Set design view
   */
  public setDesignView(): void {

    const document = this.managerService.getCurrentDocument();
    if (document.viewProperties.viewMode !== DocumentViewMode.Design) {
      document.viewProperties.viewMode = DocumentViewMode.Design;
    }

  }

  /**
   * Set xml view
   */
  public setXmlView(): void {

    const document = this.managerService.getCurrentDocument();
    if (document.viewProperties.viewMode !== DocumentViewMode.Xml) {

      document.modeler.saveXML({ format: true, preamble: true }, (err: string, xml: string) => {
        document.model.xmlContent = xml;
        document.viewProperties.viewMode = DocumentViewMode.Xml;
      });

    }
  }

  public isDesignView(): boolean {

    const document = this.managerService.getCurrentDocument();
    if (document) {
      return document.viewProperties.viewMode === DocumentViewMode.Design;
    }

  }

  public isXmlView(): boolean {

    const document = this.managerService.getCurrentDocument();
    if (document) {
      return document.viewProperties.viewMode === DocumentViewMode.Xml;
    }

  }

}
