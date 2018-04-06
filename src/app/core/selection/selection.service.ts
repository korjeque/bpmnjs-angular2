import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ManagerService} from '../manager';
import { FactoryService, IJobModeler } from '../factory';
import { ModelerProviderService } from '../modeler-provider.service';

@Injectable()
export class SelectionService {

  private selectionChangedSource: Subject<void>;
  private selectionChanged$: Observable<void>;
  private deleteSource: Subject<void>;
  private delete$: Observable<void>;

  constructor(
    private factoryService: FactoryService,
    private managerService: ManagerService,
    private providerService: ModelerProviderService
  ) {

    this.selectionChangedSource = new Subject<void>();
    this.selectionChanged$ = this.selectionChangedSource.asObservable();

    this.deleteSource = new Subject<void> ();
    this.delete$ = this.deleteSource.asObservable();

    this.factoryService.registerEvent('selection.changed', this.raiseSelectionChanged.bind(this), this);
    this.managerService.onSelectedChanged(this.raiseSelectionChanged.bind(this));

     this.factoryService.registerEvent('commandStack.elements.delete.postExecute', this.raiseSelectionDeleted.bind(this), this, 2000);
  }

  private getSelection(): BpmnJS.ISelectionService {

    if (!this.providerService.canGetService()) {
      return null;
    }

    return this.providerService.getService<BpmnJS.ISelectionService>('selection');
  }

  private raiseSelectionChanged(): void {

    try {
      this.selectionChangedSource.next();
    } catch (err) {
      console.log(err);
    }

  }

  private raiseSelectionDeleted(): void {
    try {
      console.log ('I am on raiseSelectionDelete ()');
      this.deleteSource.next();
    } catch (err) {
        console.log ('raiseSelectionDelete () ' + err);
    }
  }

  /**
   * Get array of selected elements
   */
  public get(): BpmnJS.IRegistryElement[] {
    const selectionService = this.getSelection();
    return selectionService ? selectionService.get() : null;
  }

  /**
   * Subscribe to selection changed event
   */
  public onSelectionChanged(cbk: () => void): void {
    this.selectionChanged$.subscribe(cbk);
  }

  /**
   * Subscribe to delete event
   */
  public onSelectionDeleted (cbk: () => void): void {
    this.delete$.subscribe(cbk);
  }



}
