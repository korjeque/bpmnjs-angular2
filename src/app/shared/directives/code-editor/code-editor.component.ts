import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  OnChanges
} from '@angular/core';

const brace = require('brace');
import 'brace/theme/chrome';
import 'brace/mode/javascript';
import 'brace/mode/xml';
import 'brace/ext/beautify';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.pug',
  styleUrls: ['./code-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CodeEditorComponent implements AfterViewInit {

  @Input()
  public text: string;

  @Input()
  public showToolbar: string;

  @Input()
  public readOnly: string;

  // if you change any of these values, remember to reference the corresponding libs
  @Input()
  public mode: string;

  @ViewChild('editor')
  public editor;

  public theme = 'chrome';

  @Input()
  public beautify = false;

  constructor() {
  }

  public ngAfterViewInit() {

    if (this.beautify) {
      const beautify = brace.acequire('ace/ext/beautify');
      beautify.beautify(this.editor.getEditor().session);
    }

  }

}
