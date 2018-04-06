import { Injectable } from '@angular/core';


export interface IAddButtonOptions {
  group: string;
  icon: string;
  text: string;
  index: number;
  click: () => void;
  isLarge?: boolean;
  beginSeparator?: boolean;
}

export interface IButtonGroup {
  name: string;
  buttons: IButton[];
}

interface IButton {
  text: string;
  icon: string;
  index: number;
  click: () => void;
  isLarge?: boolean;
  beginSeparator?: boolean;
}


@Injectable()
export class ToolbarService {

  private _selectedGroup;
  private _groups: IButtonGroup[];

  constructor() {
    this._groups = [];
  }

  private getOrCreateGroup(groupName: string): IButtonGroup {

    const results = this._groups.filter((g) => g.name === groupName);
    if (results.length) {
      return results[0];
    }

    const group = {
      name: groupName,
      buttons: []
    };

    this._groups.push(group);
    return group;
  }

  public add(options: IAddButtonOptions): void {

    const group = this.getOrCreateGroup(options.group);

    group.buttons.push({
      text: options.text,
      icon: options.icon,
      index: options.index,
      click: options.click,
      isLarge: options.isLarge,
      beginSeparator: options.beginSeparator
    });

    this._selectedGroup = group;
  }


  public getGroups(): IButtonGroup[] {
    return this._groups;
  }


  public isSelectedGroup(group: IButtonGroup): boolean {
    return group === this._selectedGroup;
  }

}
