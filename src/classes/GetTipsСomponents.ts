import { TElemTooltip } from "@/classes/types/elemTooltip";

interface ITipsComponents {
  link: TElemTooltip,
  tooltip: TElemTooltip,
  arrow: TElemTooltip
}

//TODO: удалить

export default class $TipsComponents implements ITipsComponents {
  private _link: TElemTooltip;
  private _tooltip: TElemTooltip;
  private _arrow: TElemTooltip;


  get link():TElemTooltip{
    return this._link
  }
  set link(elem:TElemTooltip){
    this._link = elem
  }

  get tooltip():TElemTooltip{
    return this._tooltip
  }
  set tooltip(elem:TElemTooltip){
    this._tooltip = elem
  }

  get arrow():TElemTooltip{
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
