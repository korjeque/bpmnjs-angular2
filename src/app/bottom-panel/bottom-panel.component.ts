import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';


import { IBottomButton, BottomPanelService } from './bottom-panel.service';


@Component({
  selector: 'app-bottom-panel',
  templateUrl: './bottom-panel.component.pug',
  styleUrls: ['./bottom-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BottomPanelComponent implements OnInit {

  constructor(
    private _bottomService: BottomPanelService
  ) { }

  ngOnInit() {
  }


  public getButtons(): IBottomButton[] {
    return this._bottomService.getButtons();
  }

  public isSelectedButton(button: IBottomButton): boolean {
    return this._bottomService.isSelectedButton(button);
  }


}
