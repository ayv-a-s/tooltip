import EX_ArrowPosition from "@/classes/SetArrowPosition";
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
  dynamicPosition(x: number, y: number):void
  staticPosition(): void,
  calculatePosition(): TPosition
}

export default class $TooltipPosition implements IPosition{
  private _position: string;
  private _tooltip: TElemTooltip;
  private _link: TElemTooltip;

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

  constructor() {
    this._position = 'top';
    this._link = null;
    this._tooltip = null;
  }

  staticPosition(): void{
    const newPos = this.calculatePosition();

    this.tooltip!.style.bottom = newPos.bottom;
    this.tooltip!.style.left = newPos.left;

    EX_ArrowPosition.staticPosition();
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

  calculatePosition(): TPosition{
    const link = EX_GetMeasurements.getInfo(this.link!);
    const tip = EX_GetMeasurements.getInfo(this.tooltip!);
    switch (this.position) {
      case 'left':
      case 'right':
        if (link.left >= tip.width && this.position === 'left') {
          return {
            left: `${-tip.width - 9}px`,
            bottom: `${link.height / 2 - tip.height / 2}px`
          };
        }
        if (link.right >= tip.width && this.position === 'right') {
          return {
            left: `${link.width + 9}px`,
            bottom: `${link.height / 2 - tip.height / 2}px`
          };
        }
        else {
          EX_ArrowPosition.position = 'top';
          EX_ArrowPosition.staticPosition();
          return setDefaultPos('top');
        }
      default:
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

}

