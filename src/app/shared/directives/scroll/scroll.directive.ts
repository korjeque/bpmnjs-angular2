import {
  Directive,
  ElementRef,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appScroll]',
})
export class ScrollDirective implements OnDestroy {

  constructor(private el: ElementRef) {
    (<any>jQuery(el.nativeElement)).scrollbar();
  }


  public ngOnDestroy(): void {
    (<any>jQuery(this.el.nativeElement)).scrollbar('destroy');
  }

}
