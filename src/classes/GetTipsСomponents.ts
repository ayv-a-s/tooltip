import { TElemTooltip } from "@/classes/types/elemTooltip";

interface ITipsComponents {
  link: TElemTooltip,
  tooltip: TElemTooltip,
  arrow: TElemTooltip
}

export default class $TipsComponents implements ITipsComponents {
  private _link: TElemTooltip;
  private _tooltip: TElemTooltip;
  private _arrow: TElemTooltip;


  get link():TElemTooltip{
    //return document.getElementById(this.target)!
    return this._link
  }
  set link(elem:TElemTooltip){
    this._link = elem
  }

  get tooltip():TElemTooltip{
    //return this.link!.querySelector<HTMLElement>(`tooltip-container`)!;
    //return this.link!.getElementsByClassName('tooltip-container')[0] as HTMLElement
    return this._tooltip
  }
  set tooltip(elem:TElemTooltip){
    this._tooltip = elem
  }

  get arrow():TElemTooltip{
    //return this.link!.querySelector<HTMLElement>(`tooltip-container__arrow`)!;
    //return this.link!.getElementsByClassName('tooltip-container__arrow')[0] as HTMLElement
    return this._arrow
  }
  set arrow(elem:TElemTooltip){
    this._arrow = elem
  }

  constructor() {
    this._link = null;
    this._arrow = null;
    this._tooltip = null;
  }
}
