import EX_GetMeasurements from "@/classes/GetMeasurements";
import { TElemTooltip } from "@/classes/types/elemTooltip";

type IArrow = {
  position: string,
  tooltip: TElemTooltip,
  arrow: TElemTooltip,
  link: TElemTooltip,
  staticPosition(): void
}

const EX_ArrowPosition = class $ArrowPosition implements IArrow{
  private _position: string;
  private _tooltip: TElemTooltip;
  private _link: TElemTooltip;
  private _arrow: TElemTooltip;

  set position(value:string){
    this._position = value;
  }
  get position(){
    return this._position
  }

  get tooltip(): TElemTooltip{
    return this._tooltip
  }
  set tooltip(elem: TElemTooltip){
    this._tooltip = elem
  }

  get arrow(): TElemTooltip{
    return this._arrow
  }
  set arrow(elem: TElemTooltip){
    this._arrow = elem
  }

  get link(): TElemTooltip{
    return this._link
  }
  set link(elem: TElemTooltip){
    this._link = elem
  }

  constructor() {
    this._tooltip = null;
    this._arrow = null;
    this._link = null;
    this._position = 'top';
  }

  staticPosition(): void {
    const link = EX_GetMeasurements.getInfo(this.link!);
    const tip = EX_GetMeasurements.getInfo(this.tooltip!);
    const arrow = this.arrow!;

    arrow.dataset.pos = this.position;

    switch (this.position) {
      case 'bottom':
        arrow.style.top = '-10px';
        arrow.style.left  = `${link.left - tip.left + link.width/2 - 7}px`;
        break;
      case 'left':
        arrow.style.top = `${link.top - tip.top + 2}px`;
        arrow.style.left  = `${tip.width - 2}px`;
        break;
      case 'right':
        arrow.style.top = `${link.top - tip.top + 2}px`;
        arrow.style.left  = '-10px';
        break;
      default:
        arrow.style.top = `${tip.height - 2}px`;
        arrow.style.left  = `${link.left - tip.left + link.width/2 - 7}px`;
        break;
    }
  }


}
export default new EX_ArrowPosition()