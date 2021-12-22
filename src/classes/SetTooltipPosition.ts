import EX_GetMeasurements from "@/classes/GetMeasurements";

import { TFinalComponent } from "@/classes/types/FinalComponent";

type TPosition = {
  left: string,
  bottom: string
}

interface IPosition{
  readonly position: string,
  finalComponents: TFinalComponent,
  dynamicPosition(x: number, y: number):void
  staticPosition(): void
}

export default class $TooltipPosition implements IPosition{
  readonly position: string;
  private _finalComponents: TFinalComponent;

  set finalComponents(elem: TFinalComponent){
    this._finalComponents = elem
  }
  get finalComponents(): TFinalComponent{
    return this._finalComponents
  }

  constructor(position: string) {
    this.position = position;
    this._finalComponents = {
      link: null,
      tooltip: null,
      arrow: null
    }
  }

  staticPosition(): void{
    const tooltip = this.finalComponents.tooltip;
    const newPos = this.calculatePosition();

    tooltip!.style.bottom = newPos.bottom;
    tooltip!.style.left = newPos.left;
  }

  dynamicPosition(x: number, y: number): void{
    const tooltip = this.finalComponents.tooltip;
    const tipInfo = EX_GetMeasurements.getInfo(tooltip);

    switch (this.position) {
      case 'bottom':
        tooltip!.style.left = x - tipInfo.width + 'px';
        tooltip!.style.top = y + 'px';
        break;
      case 'left':
        tooltip!.style.left = x - tipInfo.width + 'px';
        tooltip!.style.top = y - tipInfo.height + 'px';
        break;
      case 'right':
        tooltip!.style.left = x + 'px';
        tooltip!.style.top = y + 'px';
        break;
      default:
        tooltip!.style.left = x + 'px';
        tooltip!.style.top = y - tipInfo.height + 'px';
        break;
    }
  }

  private calculatePosition(): TPosition{
    const link = EX_GetMeasurements.getInfo(this.finalComponents.link!);
    const tip = EX_GetMeasurements.getInfo(this.finalComponents.tooltip!);
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

    const link = EX_GetMeasurements.getInfo(this.finalComponents.link!);
    const tip = EX_GetMeasurements.getInfo(this.finalComponents.tooltip!);
    const arrow = this.finalComponents.arrow!;

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

