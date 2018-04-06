import { Injectable } from '@angular/core';

import { ViewPropertiesService } from './view-properties';
import { BottomPanelService } from '../bottom-panel';

@Injectable()
export class RegisterBottomActionsService {

  constructor(
    private bottomService: BottomPanelService,
    private viewService: ViewPropertiesService
  ) {
  }

  /**
   * Register bottom panel buttons
   */
  public register(): void {

    this.bottomService.add({
      title: 'Design',
      index: 1,
      icon: '',
      isActive: () => this.viewService.isDesignView(),
      click: () => this.viewService.setDesignView(),
    });

    this.bottomService.add({
      title: 'Xml',
      index: 2,
      icon: '',
      isActive: () => this.viewService.isXmlView(),
      click: () => this.viewService.setXmlView(),
    });

  }

}
