import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared';
import { ToolsService } from 'app/tools';

import { PropertiesPanelComponent } from './panel';

import { PropertyService } from './property.service';
import { PropertyEditorService } from './property-editor.service';


@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    PropertiesPanelComponent,
  ],
  entryComponents: [
    PropertiesPanelComponent
  ],
  providers: [
    PropertyEditorService,
    PropertyService
  ]
})

export class PropertiesModule {

  constructor(
    private toolsService: ToolsService,
    private editorService: PropertyEditorService
  ) {

    this.toolsService.registerTool({
      id: 'PropertiesPanel',
      title: 'Properties',
      index: 1,
      component: PropertiesPanelComponent
    });

  }

}
