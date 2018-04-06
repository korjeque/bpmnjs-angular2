import { Injectable } from '@angular/core';


@Injectable()
export class PropertyEditorService {

  private registeredEditors: any = {};

  public getEditorFor(element: BpmnJS.IRegistryElement): any {
    const editor = this.registeredEditors[element.type];
    if (!editor) {
      console.error('No editor found for ' + element.type);
    }

    return editor;
  }


  public registerEditor(type: string, component: any): void {
    this.registeredEditors[type] = component;
  }

}
