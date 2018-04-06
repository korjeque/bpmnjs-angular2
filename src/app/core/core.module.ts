import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from 'app/shared';

import { FactoryService } from './factory';
import { ManagerService } from './manager';
import { StoreService } from './store';

import { ModelerProviderService } from './modeler-provider.service';
import { ActionsService } from './actions';
import { CanvasService } from './canvas';
import { ModdleService } from './moddle';
import { ModelingService } from './modeling';
import { SelectionService } from './selection';


@NgModule({
  imports: [
    SharedModule
  ]
})
export class CoreModule {

  constructor(
    private factoryService: FactoryService,
    private selectionService: SelectionService,
    private managerService: ManagerService,
    private storeService: StoreService,
  ) {
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        FactoryService,
        ManagerService,
        StoreService,

        ModelerProviderService,

        ActionsService,
        CanvasService,
        ModdleService,
        ModelingService,
        SelectionService
      ]
    };
  }

}

