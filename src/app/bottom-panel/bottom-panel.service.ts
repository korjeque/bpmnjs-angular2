import { Injectable } from '@angular/core';

export interface IBottomButton {
  title: string;
  icon: string;
  index: number;
  isActive: () => boolean;
  click: () => void;
}


@Injectable()
export class BottomPanelService {

  private _selectedButton: IBottomButton;
  private _buttons: IBottomButton[];

  constructor() {
    this._buttons = [];
  }


  public add(button: IBottomButton): void {
    this._buttons.push(button);
  }

  public getButtons(): IBottomButton[] {
    return this._buttons;
  }

  public isSelectedButton(button: IBottomButton): boolean {
    return button === this._selectedButton;
  }

}
