import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { CoreModule, FactoryService, ManagerService } from '../core';
import { BottomPanelModule } from '../bottom-panel';
import { HeaderModule } from '../header';
import { JobModelerModule } from '../job-modeler';
import { ModelStoreModule } from '../model-store';
import { PaletteModule } from '../palette';
import { PropertiesModule } from '../properties';
// import { SchemaModule } from '../schemas';
import { ToolsModule, ToolsService } from '../tools';

import { JobManagerComponent } from './container';
import { RegisterToolbarButtonsService } from './register-toolbar-buttons.service';

@NgModule({
  imports: [

    SharedModule,

    CoreModule.forRoot(),

    BottomPanelModule,
    HeaderModule.forRoot(),
    JobModelerModule.forRoot(),
    ModelStoreModule,
    PaletteModule.forRoot(),
    PropertiesModule,
    ToolsModule.forRoot(),
  ],
  declarations: [
    JobManagerComponent
  ],
  exports: [
    JobManagerComponent
  ],
  providers: [
    RegisterToolbarButtonsService
  ]
})

export class JobManagerModule {

  constructor(
    private factoryService: FactoryService,
    private managerService: ManagerService,
    private registerToolbar: RegisterToolbarButtonsService,
    private toolsService: ToolsService
  ) {

    this.registerToolbar.register();
    this.toolsService.activeToolById('PropertiesPanel');
    this.managerService.addNewDocument();
  }

}
