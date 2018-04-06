import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from 'app/shared';

import { HeaderComponent } from './header.component';
import { ToolbarService } from './toolbar.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HeaderModule,
      providers: [
        ToolbarService
      ]
    };
  }
}
