import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Ensure } from 'app/shared';

const NewDiagramXml: string = require('assets/models/initial.bpmn');

import {
  FactoryService,
  IJobModeler
} from '../factory';

import { IJobModel, StoreService } from '../store';


export interface IJobDocument {
  model: IJobModel;
  modeler: IJobModeler;
  code: string;
  viewProperties: IViewProperties;
}

export enum DocumentViewMode {
  Design,
  Xml,
  Code
}

export interface IViewProperties {
  viewMode: DocumentViewMode;
}

export interface ISelectedChangedEvent {
  previousDocument: IJobDocument;
  currentDocument: IJobDocument;
}


export interface ISelectedDeleteEvent {
  document: IJobDocument;
}

@Injectable()
export class ManagerService {

  // list of job documents
  private documents: IJobDocument[];
  private currentDocument: IJobDocument;

  // variables for switching models
  private activeIndex: number;

  private selectedChangedSource: Subject<ISelectedChangedEvent>;
  private selectedChanged$: Observable<ISelectedChangedEvent>;

  private selectedDeletedSource: Subject<ISelectedDeleteEvent>;
  private selectedDelete$: Observable<ISelectedDeleteEvent>;

  constructor(
    private factoryService: FactoryService
  ) {

    this.activeIndex = -1;

    this.documents = [];

    this.selectedChangedSource = new Subject<ISelectedChangedEvent>();
    this.selectedChanged$ = this.selectedChangedSource.asObservable();

    this.selectedDeletedSource = new Subject<ISelectedDeleteEvent> ();
    this.selectedDelete$ = this.selectedDeletedSource.asObservable ();

    this.factoryService.onModelerReady(this.modelerReady.bind(this));
  }

  /**
   * On modeler ready
   */
  private modelerReady(modeler: IJobModeler): void {

    const previousDocument = this.currentDocument;

    this.currentDocument = this.documents[this.documents.length - 1];
    this.currentDocument.modeler = modeler;

    // xml content is not needed anymore
    delete this.currentDocument.model.xmlContent;

    this.activeIndex = this.documents.length - 1;

    this.raiseSelectedChangedEvent({
      previousDocument: previousDocument,
      currentDocument: this.currentDocument
    });
  }

  /**
   * Raise selected changed event
   */
  private raiseSelectedChangedEvent(evt: ISelectedChangedEvent): void {
    this.selectedChangedSource.next(evt);
  }

  /**
   * Raise selected deleted event
   */
  private raiseSelectedDeletedEvent (evt: ISelectedDeleteEvent): void {
    this.selectedDeletedSource.next(evt);
  }

  /*
   * Returns model index with given ID
   */
  private getDocIndexByModelId(id: string): number {

    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].model.id === id) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Access to list of documents
   */
  public getDocuments(): IJobDocument[] {
    return this.documents;
  }

  /**
   * Retrieve current document
   */
  public getCurrentDocument(): IJobDocument {
    return this.currentDocument;
  }


  public getCurrentProcessId(): string {
    return this.currentDocument.model.id;
  }

  public addNewDocument(): void {
    this.openDocument(<any>{
      id: 'TestProcess',
      name: 'Test process',
      xmlContent: NewDiagramXml
    });
  }

  /*
   * Open model from file or DTO
   */
  public openDocument(model: IJobModel): void {

    // if the process is already opened, just switch to it
    const index: number = this.getDocIndexByModelId(model.id);
    if (index >= 0) {

      this.selectDocumentByIndex(index);

    } else {

      // add document
      this.documents.push({
        modeler: null,
        code: null,
        model: model,
        viewProperties: {
          viewMode: DocumentViewMode.Design
        }
      });

    }

  }

  /**
   * Returns true if given model is the selected one
   */
  public isSelectedDocument(document: IJobDocument): boolean {
    return this.activeIndex === this.documents.indexOf(document);
  }

  /**
   * Close given document
   */
  public closeDocument(document: IJobDocument): void {

    const index = this.documents.indexOf(document);
    Ensure.inBounds(index, this.documents, 'CloseDocument index out of bounds');

    this.documents.splice(index, 1);
    document.modeler.destroy();

    if (document === this.currentDocument) {
      this.currentDocument = null;

      if (this.documents.length > 0) {
        this.selectDocumentByIndex(index > 0 ? index - 1 : index === this.documents.length ? this.documents.length - 1 : 0);
      }
    }
  }

  /*
   * Select document
   */
  public selectDocument(document: IJobDocument): void {
    const index = this.documents.indexOf(document);
    this.selectDocumentByIndex(index);
  }

  /*
   * Select model by index
   */
  public selectDocumentByIndex(index: number): void {

    const previousDocument = this.currentDocument;

    this.activeIndex = index;
    this.currentDocument = index >= 0 && index < this.documents.length ? this.documents[index] : null;

    this.raiseSelectedChangedEvent({
      previousDocument: previousDocument,
      currentDocument: this.currentDocument
    });

  }


  /**
   * Subscribe to selected changed event
   */
  public onSelectedChanged(cbk: (evt: ISelectedChangedEvent) => void): void {
    this.selectedChanged$.subscribe(cbk);
  }

  /**
   * Subcribe to deleted event
   */
  // public onSelectedDeleted (cbk: (evt: ISelectedDeleteEvent) => void): void {
  //   this.selectedDelete$.subscribe(cbk);
  // }

}
