import { NgModule, ModuleWithProviders } from '@angular/core';

import { CoreModule } from 'app/core';
import { SharedModule } from 'app/shared';

import { JobModelerComponent } from './container';
import { ViewPropertiesService } from './view-properties';
import { RegisterBottomActionsService } from './register-bottom-actions.service';


@NgModule({
  imports: [
    CoreModule,
    SharedModule
  ],
  declarations: [
    JobModelerComponent
  ],
  exports: [
    JobModelerComponent
  ]
})
export class JobModelerModule {

  constructor(
    private registerBottom: RegisterBottomActionsService,
  ) {

    // required for inter services initialization, find a better way
    this.registerBottom.register();
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: JobModelerModule,
      providers: [

        ViewPropertiesService,
        RegisterBottomActionsService

      ]
    };
  }

}

