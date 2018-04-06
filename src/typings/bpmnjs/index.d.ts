
declare module BpmnJS {



  interface IBpmnModdleFactory {
    new(packages: any): IBpmnModdleService;
  }

  interface IAlignment {
    left?: number;
    right?: number;
    center?: number;
    top?: number;
    bottom?: number;
    middle?: number;
  }

  // provides support for alignment of selected elements in diagram
  interface IAlignService {
    /**
     * Executes the alignment of a selection of elements
     *
     * @param  {Array} elements [description]
     * @param  {String} type left|right|center|top|bottom|middle
     */
    trigger(elements: IRegistryElement[], position: string): void;
  }


  interface IBounds {
    x: number;
    y: number;
    width: number;
    height: number;
  }


  interface IBaseModeler {
    get<T>(service: string): T;
  }

  export interface IBpmnModeler extends IBaseModeler, IBpmnModelerFactory {
    importXML(xml: string, fn: (err: string, results: IModdleImportWarning[]) => void): void;
    saveXML(options: ISaveXMLOptions, fn: (err: string, xml: string) => void): void;
    saveSVG(fn: (err: string, svg: string) => void): void;
    destroy(): void;
  }


  interface IBpmnNavigatedViewer extends IBpmnModeler {

  }

  interface IBpmnModelerModule {
  }


  interface IBpmnPropertiesPanel {
    parent: JQuery;
  }


  interface IBpmnModelerOptions {

    container: JQuery | string;

    propertiesPanel?: IBpmnPropertiesPanel;

    modules?: any[];

    additionalModules?: IBpmnModelerModule[];

    moddleExtensions?: any;
  }


  interface IBpmnModelerFactory {
    new(options: IBpmnModelerOptions): IBpmnModeler;
  }

  interface IBpmnNavigatedViewerFactory {
    new(options: IBpmnModelerOptions): IBpmnNavigatedViewer;
  }


  interface IExtensionElements {
    values: any[];
  }




  interface ICanvasViewBox extends IBounds {
    outer?: IBounds;
    inner?: IBounds;
    scale?: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface ICanvasService {

    _container: HTMLElement,
    addMarker(elementId: string, cssClass: string): void;
    removeMarker(elementId: string, cssClass: string): void;
    getRootElement(): IRegistryElement;
    getDefaultLayer(): any;
    resized(): void;
    viewbox(newViewBox?: ICanvasViewBox): ICanvasViewBox;
    zoom(num?: number): number;
  }

  interface IClipboardService {
    set(data: any): void;
    clear(): void;
    isEmpty(): boolean;
  }

  interface ICommandStackHandler {
    preExecute(context: any): void;
    execute(context: any): void;
    revert(context: any): void;
  }

  interface ICommandStackService {

    canUndo(): boolean;
    canRedo(): boolean;
    undo(): void;
    redo(): void;

    execute(commandToExecute: string, params: any): void;
    registerHandler(id: string, cls: any): void;

  }

  interface ICommandStackContext {
    elements: IRegistryElement[];
    shape: IRegistryElement;
    parent: IRegistryElement;
    position: IPoint;
  }

  interface ICommandStackShapeContext {
    shapes: IRegistryElement[];
  }

  interface ICommandStackElementsContext {
    elements: IRegistryElement[];
  }

  interface ICommandStackElementsEvent {
    command: string;
    type: string;
    id: number;
    context: ICommandStackContext;
  }

  interface ICommandStackEvent {
    command: string;
    type: string;
    id: number;
    context: ICommandStackContext;
  }

  interface ICommandStackShapeEvent {
    context: ICommandStackShapeContext;
  }

  interface IConnection extends IRegistryElement {
    waypoints: IPoint[];
  }

  interface IConnectionChangedEvent {
    element: IConnection;
  }


  interface ICopyPasteService {

    copy(element: IRegistryElement | IRegistryElement[]): void;
    paste(hoverContext: any): void;

  }


  // drag new elements helper service
  interface ICreateService {
    start(event: any, shape: IRegistryElement, source?: any): void;
  }


  interface ICreateShapeOptions {
    type: string;
  }

  // provides support for alignment of selected elements in diagram
  interface IDistributeService {
    /**
     * Distributes the elements with a given orientation
     *
     * @param  {Array} elements    [description]
     * @param  {String} orientation horizontal|vertical
     */
    trigger(elements: IRegistryElement[], orientation: string): void;
  }

  interface IDraggingService {

    /**
     * Initialize a drag operation.
     *
     * If `localPosition` is given, drag events will be emitted
     * relative to it.
     *
     * @param {MouseEvent|TouchEvent} [event]
     * @param {Point} [localPosition] actual diagram local position this drag operation should start at
     * @param {String} prefix
     * @param {Object} [options]
     */
    init(event: any, relativeTo: any, prefix: any, options?: any): void;
  }

  interface IEditorActionsService {
    trigger(command: string, opts?: any): void;
    removeSelection(): void;
    zoom(opts: IZoomOpts): void;
    stepZoom(opts: IZoomOpts): void;
    moveCanvas(opts: any): void;
  }

  // construct new elements helper service
  interface IElementFactory {
    createShape(options: ICreateShapeOptions): IRegistryElement;
    createParticipantShape(collapsed?: boolean): IRegistryElement;
  }

  interface IElementsChangedEvent {
    elements: IRegistryElement[];
  }


  interface IElementChangedEvent {
    element: any;
    gfx: any;
    type: string;
  }

  interface IErrorResult {
    message: string;
    get_stack(): any;
  }


  // internal BPMNJS event bus
  interface IEventBusService {

    fire(eventName: string, data?: any): void;

    on<T>(eventName: string | string[], priority: any, fn: any, that?: any): void;
    once<T>(eventName: string | string[], priority: any, fn: any, that?: any): void;
    off<T>(eventName: string, fn: (t: T) => void): void;

  }

  interface IGlobalConnect {
    start(event?: Event): void;
    toggle(): void;
    isActive(): boolean;
  }


  interface IHandTool {
    activateHand(event?: Event, autoActivate?: boolean, reactivate?: boolean): void;
    toggle(): void;
    isActive(): boolean;
  }


  // internal BPMNJS keyboard service
  interface IKeyboardService {

    // bind keyboard to dom element, typically is the document itself
    bind(el: HTMLDocument): void;

    // unbind, only one can be attached to the keyboard
    unbind(): void;

    // returns dom element where keyboard is binded to, null if not binded
    getBinding(): HTMLDocument;

  }

  interface ILassoTool {
    activateSelection(event?: Event, autoActivate?: boolean, reactivate?: boolean): void;
    toggle(): void;
    isActive(): boolean;
  }



  interface IModdleDescriptor {
  }

  interface IModdleService {
    create(value: string, attrs?: any): IModdleElement;
    getType(descriptor: string | any): IModdleDescriptor;
  }

  interface IModdleImportWarning {
    error: any;
    message: string;
  }

  interface IModdleImportResults {
    warnings: IModdleImportWarning[];
  }

  interface IBpmnModdleService extends IModdleService {
    fromXML(xml: string, fn: (err: IErrorResult, definitions: any, results: IModdleImportResults) => void): void;
    toXML(): void;
  }


  interface IModdleDefinitions {
    $type: string;
    id: string;
    targetNamespace: string;
    rootElements: IModdleElement[];
  }


  interface IModdleElement {

    id: string;
    name: string;

    type: string;

    $parent: IModdleElement;
    $type: string;
    $attrs: any[];
    incoming: any[];
    outgoing: any[];

    extensionElements: any;

    sourceRef?: IModdleElement;
    targetRef?: IModdleElement;

    flowElements?: IModdleElement[];
    di?: any;

    get<T>(propertyName: string): T;
    set<T>(propertyName: string, propertyValue: T): void;
  }



  // internal BPMNJS modeling service, for manipulate shape elements
  interface IModelingService {

    // creates a new shape in the system
    createShape(shape: IRegistryElement, position: IPoint, target?: IRegistryElement, targetIndex?: number, isAttach?: boolean, hints?: any): IRegistryElement;

    // moves element from one position to another
    moveShape(shape: IRegistryElement, delta: IPoint, newParent?: IRegistryElement, newParentIndex?: number, hints?: any): void;

    // moves a collection of elements
    moveElements(shapes: IRegistryElement[], delta: IPoint, newParent?: IRegistryElement, newParentIndex?: number, hints?: any): void;

    // sets fill/stroke colors for element
    setColor(shapes: IRegistryElement, opts: any): void;

    // resizes an element
    resizeShape(shape: IRegistryElement, newBounds: IBounds): void;

    // align selected elements
    alignElements(elements: IRegistryElement[], alignment: IAlignment): void;

    // distributes selected elements by given alignment
    distributeElements(groups: any, axis: any, dimension: any): void;

    // toggles element collapsed property, and makes all child elements hidden
    toggleCollapse(shape: IRegistryElement, hints: any): void;

    // update element properties for undo/redo support
    updateProperties(shape: IRegistryElement, properties: any): void;

  }


  interface IMouseTrackingService {
    getHoverContext(): any;
  }



  interface IOverlayPosition {
    left?: number;
    top?: number;
    bottom?: number;
    right?: number;
  }

  interface IOverlayShow {
    minZoom: number; // minimal zoom level to show the overlay
    maxZoom: number; // maximum zoom level to show the overlay
  }

  interface IOverlayElement {
    html: JQuery | string; // html element to use as an overlay
    position: IOverlayPosition; // where to attach the overlay
    show?: IOverlayShow;
  }

  interface IOverlayService {

    // add new overlay, returns overlay Id
    add(elementId: string | IRegistryElement, overlay: IOverlayElement): string;

    // remove overlay by overlay Id
    remove(overlayId: string): void;

  }

  interface IPoint {
    x: number;
    y: number;
  }

  // represents a single bpmn element
  interface IRegistryElement {

    id: string;

    parent: any;
    getParent(): any;
    setParent(value: any): void;

    getLabel(): any;
    setLabel(value: any): void;

    label: IRegistryElement;
    businessObject: IModdleElement;
    collapsed: boolean;

    height: number;
    width: number;
    x: number;
    y: number;

    source?: IRegistryElement;

    properties?: any;

    incoming: IRegistryElement[];
    outgoing: any[];
    type: string;
  }



  // internal BPMNJS registry service, to access individual elements
  interface IRegistryService {

    get(id: string): IRegistryElement;
    getAll(): IRegistryElement[];
    getGraphics(element: IRegistryElement): any;

  }

  interface ISearchPadService {
    toggle(): void;
  }


  interface ISelectionService {

    get(): IRegistryElement[];
    select(element: IRegistryElement | IRegistryElement[], add?: boolean): void;
    deselect(element: IRegistryElement | IRegistryElement[]): void;
    isSelected(element: IRegistryElement | IRegistryElement[]): boolean;

  }

  interface ISpaceTool {
    activateSelection(event?: Event, autoActivate?: boolean, reactivate?: boolean): void;
    toggle(): void;
    isActive(): boolean;
  }

  interface IZoomOpts {
    value: IZoomOptsValue;
  }


  interface IZoomOptsValue {
    newScale: string | number; // number (0.9) or 'fit-viewport'
    center?: string | IPoint; // 'auto' to zoom into mid or null
  }


  enum ZoomDirection {
    In = 1,
    Out = -1,
  }

  interface IZoomScrollService {
    stepZoom(direction: ZoomDirection): void;
    reset(): void;
  }

  interface ISaveXMLOptions {
    format: boolean;
    preamble: boolean;
  }

}
