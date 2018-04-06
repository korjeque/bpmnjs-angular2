import { NgModule, ModuleWithProviders } from '@angular/core';

import { SharedModule } from 'app/shared';
import { FactoryService } from '../core';
import { PaletteComponent } from './palette.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    PaletteComponent
  ],
  exports: [
    PaletteComponent
  ]
})

export class PaletteModule {

  constructor(
    private factoryService: FactoryService
  ) {

    // disable BpmnJS palette
    this.factoryService.registerModule({
      palette: [ 'value', null ],
      paletteProvider: [ 'value', null ],
    });

  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PaletteModule,
    };
  }
}
