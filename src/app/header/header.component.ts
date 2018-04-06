import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  ToolbarService,
  IButtonGroup,
} from './toolbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(
    private _toolbarService: ToolbarService
  ) { }

  ngOnInit() {
  }


  public getGroups(): IButtonGroup[] {
    return this._toolbarService.getGroups();
  }

  public isSelectedGroup(group: IButtonGroup): boolean {
    return this._toolbarService.isSelectedGroup(group);
  }

}
