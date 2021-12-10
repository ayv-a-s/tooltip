import $TooltipPosition from "@/classes/SetTooltipPosition";

import { TElemTooltip } from "@/classes/types/elemTooltip";

interface IEvent {
  event: string,
  isOpened: boolean,
  tooltip: TElemTooltip,
  link: TElemTooltip,
  TooltipPosition: $TooltipPosition,
  addEventListener():void
}

export default class $AddListener implements IEvent{
  private _event: string;
  private _isOpened: boolean;
  private _tooltip: TElemTooltip;
  private _link: TElemTooltip;
  private _TooltipPosition: $TooltipPosition;

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
    this.changeTipsState()
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

  get TooltipPosition(): $TooltipPosition{
    return this._TooltipPosition
  }
  set TooltipPosition(ex: $TooltipPosition){
    this._TooltipPosition = ex
  }

  constructor() {
    this._event = 'onClick';
    this._isOpened = false;
    this._link = null;
    this._tooltip = null;
    this._TooltipPosition = new $TooltipPosition();
  }

  addEventListener(): void{
    switch (this.event){
      case 'onHover':
        this.link!.onpointerover = ()=>{
          this.TooltipPosition.calculatePosition();
          this.isOpened = true;
        };
        this.link!.onpointerleave = ()=>{
          this.isOpened = false;
        };
        break;

      case 'onFloat':
        this.link!.onmousemove = (e)=>{
          this.link!.style.position = 'unset';
          this.TooltipPosition.dynamicPosition(e.clientX, e.clientY);
          this.isOpened = true;
        };
        this.link!.onmouseleave = ()=>{
          this.isOpened = false;
        };
        break;

      default:
        this.link!.onclick = ()=>{
          this.TooltipPosition.calculatePosition();
          this.isOpened = !this.isOpened;
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

