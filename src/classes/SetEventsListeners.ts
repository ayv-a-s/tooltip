import EX_TooltipPosition from "@/classes/SetTooltipPosition";

import { TElemTooltip } from "@/classes/types/elemTooltip";

interface IEvent {
  event: string,
  isOpened: boolean,
  tooltip: TElemTooltip,
  link: TElemTooltip,
  addEventListener():void
}

export default class $AddListener implements IEvent{
  private _event: string;
  private _isOpened: boolean;
  private _tooltip: TElemTooltip;
  private _link: TElemTooltip;

  get event(){
    return this._event
  }
  set event(name: string){
    this._event = name;
  }

  get isOpened(): boolean{
    return this._isOpened
  }
  set isOpened(state: boolean){
    this._isOpened = state;
  }

  get tooltip(): TElemTooltip{
    return this._tooltip
  }
  set tooltip(elem: TElemTooltip){
    this._tooltip = elem
  }

  get link(): TElemTooltip{
    return this._link
  }
  set link(elem: TElemTooltip){
    this._link = elem
  }

  constructor() {
    this._event = 'onClick';
    this._isOpened = false;
    this._link = null;
    this._tooltip = null;
  }

  addEventListener(): void{
    switch (this.event){
      case 'onHover':
        this.link!.onpointerover = ()=>{
          EX_TooltipPosition.calculatePosition();
          this.isOpened = true;
          this.changeTipsState();
        };
        this.link!.onpointerleave = ()=>{
          this.isOpened = false;
          this.changeTipsState();
        };
        break;

      case 'onFloat':
        this.link!.onpointermove = (e)=>{
          this.link!.style.position = 'unset';
          EX_TooltipPosition.dynamicPosition(e.clientX, e.clientY);
          this.isOpened = true;
          this.changeTipsState();
        };
        this.link!.onpointerleave = ()=>{
          this.isOpened = false;
          this.changeTipsState();
        };
        break;

      default:
        this.link!.onclick = ()=>{
          EX_TooltipPosition.calculatePosition();

          this.isOpened = !this.isOpened;
          this.changeTipsState()
        };
        break;
    }
  }

  private changeTipsState() {
    const tooltip = this.tooltip!;

    this.isOpened ?
      tooltip.classList.remove('hidden') :
      tooltip.classList.add('hidden');
  }
}

