import { Injectable } from '@angular/core';

import { ManagerService } from '../manager';
import { ModelerProviderService } from '../modeler-provider.service';


@Injectable()
export class ActionsService {

  constructor(
    private managerService: ManagerService,
    private providerService: ModelerProviderService,
  ) {}

  public areOperationsAllowed(): boolean {
    return this.managerService.getCurrentDocument() != null;
  }

  private getActions(): BpmnJS.IEditorActionsService {
    return this.providerService.getService<BpmnJS.IEditorActionsService>('editorActions');
  }

  private getHandTool(): BpmnJS.IHandTool {
    return this.providerService.getService<BpmnJS.IHandTool>('handTool');
  }

  private getLassoTool(): BpmnJS.ILassoTool {
    return this.providerService.getService<BpmnJS.ILassoTool>('lassoTool');
  }

  private getSpaceTool(): BpmnJS.ISpaceTool {
    return this.providerService.getService<BpmnJS.ISpaceTool>('spaceTool');
  }

  private getGlobalConnect(): BpmnJS.IGlobalConnect {
    return this.providerService.getService<BpmnJS.IGlobalConnect>('globalConnect');
  }

  private getSearchPad(): BpmnJS.ISearchPadService {
    return this.providerService.getService<BpmnJS.ISearchPadService>('searchPad');
  }

  public toggleSearchPad(): void {
    this.getSearchPad().toggle();
  }

  public activateHandTool(event: Event): void {
    this.getHandTool().activateHand(event);
  }

  public isHandToolActive(): boolean {
    return this.getHandTool().isActive() ? true : false;
  }

  public activateLassoTool(event: Event): void {
    this.getLassoTool().activateSelection(event);
  }

  public isLassoToolActive(): boolean {
    return this.getLassoTool().isActive() ? true : false;
  }

  public activateSpaceTool(event: Event): void {
    this.getSpaceTool().activateSelection(event);
  }

  public isSpaceToolActive(): boolean {
    return this.getSpaceTool().isActive() ? true : false;
  }

  public activateConnectionTool(event: Event): void {
    this.getGlobalConnect().toggle();
  }

  public isConnectionToolActive(): boolean {
    return this.getGlobalConnect().isActive() ? true : false;
  }

}

