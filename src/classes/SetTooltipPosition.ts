import EX_GetMeasurements from "@/classes/GetMeasurements";

import { TFinalComponent } from "@/types/FinalComponent";

type TPosition = {
  left: string,
  bottom: string
}

interface IPosition{
  readonly position: string,
  finalComponents: TFinalComponent,
  setDynamicPosition(x: number, y: number): void,
  setStaticPosition(): void
}

export default class $TooltipPosition implements IPosition{
  readonly position: string;
  private _finalComponents: TFinalComponent = {
    link: null,
    tooltip: null,
    arrow: null
  };

  constructor(position: string) {
    this.position = position;
  }

  set finalComponents(elem: TFinalComponent){
    this._finalComponents = elem
  }
  get finalComponents(): TFinalComponent{
    return this._finalComponents
  }

  //Метод вычисляет положение тултипа для onHover и onClick
  public setStaticPosition(): void{
    const tooltip = this.finalComponents.tooltip;
    if (tooltip) {
      const newPos = this.calculatePosition();

      tooltip.style.bottom = newPos.bottom;
      tooltip.style.left = newPos.left;
    } else {
      console.error('Tooltip is null or undefined');
    }
  }

  //Метод вычисляет положение тултипа для onFloat
  public setDynamicPosition(x: number, y: number): void{
    const tooltip = this.finalComponents.tooltip;
    if (tooltip) {
      const tipInfo = EX_GetMeasurements.getInfo(tooltip);

      switch (this.position) {
        case 'bottom':
          tooltip.style.left = x - tipInfo.width + 'px';
          tooltip.style.top = y + 'px';
          break;
        case 'left':
          tooltip.style.left = x - tipInfo.width + 'px';
          tooltip.style.top = y - tipInfo.height + 'px';
          break;
        case 'right':
          tooltip.style.left = x + 'px';
          tooltip.style.top = y + 'px';
          break;
        default:
          tooltip.style.left = x + 'px';
          tooltip.style.top = y - tipInfo.height + 'px';
          break;
      }
    } else {
      console.error('Tooltip is null or undefined');
    }

  }

  //Метод пересчитывает положение тултипа, если он не помещается на странице
  private calculatePosition(): TPosition{
    const link = EX_GetMeasurements.getInfo(this.finalComponents.link!);
    const tip = EX_GetMeasurements.getInfo(this.finalComponents.tooltip!);
    switch (this.position) {
      case 'left':
      case 'right':
        if (link.left >= tip.width && this.position === 'left') {
          this.setArrowPosition(this.position)
          return {
            left: `${-tip.width - 9}px`,
            bottom: `${link.height / 2 - tip.height / 2}px`
          };
        }
        if (link.right >= tip.width && this.position === 'right') {
          this.setArrowPosition(this.position)
          return {
            left: `${link.width + 9}px`,
            bottom: `${link.height / 2 - tip.height / 2}px`
          };
        }
        else {
          this.setArrowPosition('top');
          return checkSpaceAround('top');
        }
      default:
        this.setArrowPosition(this.position);
        return checkSpaceAround(this.position);
    }

    function checkSpaceAround(pos: string):TPosition {
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

  private setArrowPosition(pos:string): void {
    const link = EX_GetMeasurements.getInfo(this.finalComponents.link!);
    const tip = EX_GetMeasurements.getInfo(this.finalComponents.tooltip!);

    const arrow = this.finalComponents.arrow;

    if(arrow){
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
    } else console.error('Arrow is null');

  }
}

