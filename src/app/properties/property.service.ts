import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SelectionService } from 'app/core';

@Injectable()
export class PropertyService {

  private selectionChangedSource: Subject<void>;
  private selectionChanged$: Observable<void>;

  constructor(
    private selectionService: SelectionService
  ) {

    this.selectionChangedSource = new Subject<void>();
    this.selectionChanged$ = this.selectionChangedSource.asObservable();

    this.selectionService.onSelectionChanged(this.raiseSelectionChanged.bind(this));
  }

  private raiseSelectionChanged(): void {

    try {
      this.selectionChangedSource.next();
    } catch (err) {
      console.log(err);
    }
  }

  public getSelection(): BpmnJS.IRegistryElement {
    const selection = this.selectionService.get();
    if (!selection || !selection.length) {
      return null;
    }

    return selection[0];
  }

  /**
   * Subscribe to selected changed event
   */
  public get selectionChanged(): Observable<void> {
    return this.selectionChangedSource;
  }

}
