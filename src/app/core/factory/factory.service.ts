import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as Modeler from 'bpmn-js/lib/Modeler';
import * as Viewer from 'bpmn-js/lib/NavigatedViewer';

const BpmnJsObjects = require('diagram-js/lib/model');


export interface IJobModeler extends BpmnJS.IBpmnModeler {
  container: any; // jQuery container
}


export interface IImportResult {
  warnings: IImportMessage[];
}

export interface IImportMessage {
  error: string;
  message: string;
}


/**
 * Interface for describing a process modeler internal event
 */
export interface IModelerEvent {
  eventName: string;
  priority: number;
  caller: any;
  callback: (params?: any[]) => void;
}


@Injectable()
export class FactoryService {

  private moddleExtensions: any;
  private additionalModules: any[];
  private registeredEvents: IModelerEvent[];

  private modelerReadySource: Subject<IJobModeler>;
  private modelerReady$: Observable<IJobModeler>;


  constructor(
  ) {
    this.moddleExtensions = {};
    this.additionalModules = [];
    this.registeredEvents = [];

    this.modelerReadySource = new Subject<IJobModeler>();
    this.modelerReady$ = this.modelerReadySource.asObservable();

  }

  private createReadonlyModeler(options: any): IJobModeler {
    return <IJobModeler>new Viewer.default(options);
  }

  private createWritableModeler(options: any): IJobModeler {
    return <IJobModeler>new Modeler.default(options);
  }

  private raiseImportWarningEvent(result: IImportResult[]): void {

    // todo: Notify import warnings
    // this._importWarningListeners.forEach((c) => c(result));
  }

  private raiseModelerReady(modeler: IJobModeler): void {
    this.modelerReadySource.next(modeler);
  }

  /**
   * Constructs new BpmnJS modeler instance, using registered moddle extensions and modules
   */
  public createModeler(container: JQuery | string, readonly: boolean, xml: string): Promise<IJobModeler> {

    return new Promise((resolve, reject) => {

      const options = {
        container: container,
        moddleExtensions: this.moddleExtensions,
        additionalModules: this.additionalModules
      };

      const modeler = readonly ? this.createReadonlyModeler(options) : this.createWritableModeler(options);

      modeler.container = container;
      modeler.importXML(xml, (err, results: any[]) => {

        const eventBus = modeler.get<BpmnJS.IEventBusService>('eventBus');
        this.registeredEvents.forEach((e) => {

          eventBus.on(e.eventName, e.priority, (evt) => {
            e.callback(evt);
          }, e.caller);

        });

        this.raiseModelerReady(modeler);

        return resolve(<any>modeler);

      });

    });

  }

  public isShape(obj: any): boolean {
    return obj instanceof BpmnJsObjects.Shape;
  }

  /**
   * Register new moddle extension to be added to each new modeler
   */
  public registerModdleExtension(name: string, contents: any): void {

    if (!name || !name.length) {
      throw new Error('Moddle extension name is required');
    }

    if (!contents) {
      throw new Error('Moddle extension contents are required');
    }

    if (this.moddleExtensions[name]) {
      throw new Error('A Moddle extension with the same name was already added');
    }

    this.moddleExtensions[name] = contents;

  }

  /**
   * Register new additional module to be added to each new modeler
   */
  public registerModule(additionalModule: any): void {

    if (!additionalModule) {
      throw new Error('Additional module cannot be null');
    }

    this.additionalModules.push(additionalModule);
  }

  /**
   * Register for modeler event. All new modelers will have this event attached
   */
  public registerEvent(eventName: string, callback: () => void, caller: any, priority?: number): void {

    this.registeredEvents.push({
      eventName: eventName,
      priority: priority || 500,
      callback: callback,
      caller: caller
    });

  }

  /**
   * Subscribe to modeler ready event
   */
  public onModelerReady(cbk: () => void): void {
    this.modelerReady$.subscribe(cbk);
  }
}
