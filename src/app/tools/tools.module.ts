import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from '../shared';
import { ToolsPanelComponent } from './panel';
import { ToolsService } from './tools.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ToolsPanelComponent
  ],
  exports: [
    ToolsPanelComponent
  ]
})

export class ToolsModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToolsModule,
      providers: [
        ToolsService
      ]
    };
  }

}
