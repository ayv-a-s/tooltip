import EX_GetMeasurements from "@/classes/GetMeasurements";

import { TElemTooltip } from "@/classes/types/elemTooltip";

type TPosition = {
  left: string,
  bottom: string
}

interface IPosition{
  position: string,
  tooltip: TElemTooltip,
  link: TElemTooltip,
  arrow: TElemTooltip,
  dynamicPosition(x: number, y: number):void
  staticPosition(): void
}

export default class $TooltipPosition implements IPosition{
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

  set tooltip(elem: TElemTooltip){
    this._tooltip = elem
  }
  get tooltip(): TElemTooltip{
    return this._tooltip
  }

  set link(elem: TElemTooltip){
    this._link = elem
  }
  get link(): TElemTooltip{
    return this._link
  }

  get arrow(): TElemTooltip{
    return this._arrow
  }
  set arrow(elem: TElemTooltip){
    this._arrow = elem
  }

  constructor() {
    this._position = 'top';
    this._link = null;
    this._arrow = null;
    this._tooltip = null;
  }

  staticPosition(): void{
    const newPos = this.calculatePosition();

    this.tooltip!.style.bottom = newPos.bottom;
    this.tooltip!.style.left = newPos.left;
  }

  dynamicPosition(x: number, y: number): void{
    const tipInfo = EX_GetMeasurements.getInfo(this.tooltip);

    switch (this.position) {
      case 'bottom':
        this.tooltip!.style.left = x - tipInfo.width + 'px';
        this.tooltip!.style.top = y + 'px';
        break;
      case 'left':
        this.tooltip!.style.left = x - tipInfo.width + 'px';
        this.tooltip!.style.top = y - tipInfo.height + 'px';
        break;
      case 'right':
        this.tooltip!.style.left = x + 'px';
        this.tooltip!.style.top = y + 'px';
        break;
      default:
        this.tooltip!.style.left = x + 'px';
        this.tooltip!.style.top = y - tipInfo.height + 'px';
        break;
    }
  }

  private calculatePosition(): TPosition{
    const link = EX_GetMeasurements.getInfo(this.link!);
    const tip = EX_GetMeasurements.getInfo(this.tooltip!);
    switch (this.position) {
      case 'left':
      case 'right':
        if (link.left >= tip.width && this.position === 'left') {
          this.arrowPosition(this.position)
          return {
            left: `${-tip.width - 9}px`,
            bottom: `${link.height / 2 - tip.height / 2}px`
          };
        }
        if (link.right >= tip.width && this.position === 'right') {
          this.arrowPosition(this.position)
          return {
            left: `${link.width + 9}px`,
            bottom: `${link.height / 2 - tip.height / 2}px`
          };
        }
        else {
          this.arrowPosition('top');
          return setDefaultPos('top');
        }
      default:
        this.arrowPosition(this.position);
        return setDefaultPos(this.position);
    }

    function setDefaultPos(pos: string):TPosition {
      //если место есть только справа
      if (link.right > tip.width/2 && link.left <= tip.width/2) {
        return {
          left: `-5px`,
          bottom: pos === "top" ? `${link.height + 9}px` : `${-tip.height - 9}px`
        };
      }
      //если место есть только слева
      else if (link.right <= tip.width/2 && link.left > tip.width/2) {
        return {
          left: `${link.width / 2 - tip.width + 15}px`,
          bottom: pos === "top" ? `${link.height + 9}px` : `${-tip.height - 9}px`
        }
      }
      //если поместится по центру
      return {
        left: `${link.width/2 - tip.width/2}px`,
        bottom: pos === 'top' ? `${link.height + 9}px` : `${-tip.height - 9}px`
      };
    }
  }

  private arrowPosition(pos:string): void {

    const link = EX_GetMeasurements.getInfo(this.link!);
    const tip = EX_GetMeasurements.getInfo(this.tooltip!);
    const arrow = this.arrow!;

    arrow.dataset.pos = pos;

    switch (pos) {
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

