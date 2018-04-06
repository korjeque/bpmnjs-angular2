import { Injectable } from '@angular/core';
import { Ensure } from 'app/shared';


export interface ITool {
  id: string;
  title: string;
  index: number;
  component: any;
}

@Injectable()
export class ToolsService {

  private _tools: ITool[];
  private _activeTool: ITool;

  constructor() {
    this._tools = [];
  }

  /**
   * Lookup tool by id
   */
  private getToolById(toolId: string): ITool {
    const t = this._tools.filter((tool) => tool.id === toolId);
    return t.length > 0 ? t[0] : null;
  }

  /**
   * Register new tool
   */
  public registerTool(tool: ITool): void {

    Ensure.notNull(tool, 'Register tool, tool is required');
    Ensure.notNullEmpty(tool.id, 'Register tool, tool id is required');
    Ensure.notNullEmpty(tool.title, 'Register tool, tool title is required');
    Ensure.notNull(tool.component, 'Register tool, component is required');

    this._tools.push(tool);
    this._tools = this._tools.sort((a, b) => a.index - b.index);
  }

  /**
   * Returns the list of registered tools
   */
  public getTools(): ITool[] {
    return this._tools;
  }

  /**
   * Activate tool by id
   */
  public activeToolById(toolId: string): void {

    Ensure.notNullEmpty(toolId, 'Activate tool by Id, toolId is required');
    const tool = this.getToolById(toolId);

    Ensure.notNull(tool, `Tool with Id {toolId} not found`);
    this._activeTool = tool;
  }

  /**
   * Returns true if given tool is active
   */
  public isActiveTool(tool: ITool): boolean {
    return tool === this._activeTool;
  }

  /**
   * Set given tool as active
   */
  public activateTool(tool: ITool): void {
    Ensure.notNull(tool, 'Activate tool, tool is required');
    this._activeTool = tool;
  }

  /**
   * Gets current active tool
   */
  public getActiveTool(): ITool {
    return this._activeTool;
  }

}
