import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { BottomPanelComponent } from './bottom-panel.component';
import { BottomPanelService } from './bottom-panel.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    BottomPanelComponent
  ],
  exports: [
    BottomPanelComponent
  ],
  providers: [
    BottomPanelService
  ]
})
export class BottomPanelModule { }
