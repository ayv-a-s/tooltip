import { TElementPosition } from '@/classes/types/ElementPosition'
import { TDomElement } from "@/classes/types/DomElement";

type TInfo = {
  width: number,
  height: number
} & TElementPosition

interface IGetMeasurements{
  getInfo(el: TDomElement): TInfo
}

const EX_GetMeasurements = class $GetMeasurements implements IGetMeasurements {

  getInfo(el: TDomElement): TInfo{
    return {
      width:  this.getWidth(el),
      height: this.getHeight(el),
      left: this.getElemCoords(el).left,
      right: this.getElemCoords(el).right,
      top: this.getElemCoords(el).top,
      bottom: this.getElemCoords(el).bottom
    }
  }

  private getWidth(elem: TDomElement): number{
    return elem!.offsetWidth;
  }

  private getHeight(elem: TDomElement): number {
    return elem!.offsetHeight
  }

  private getElemCoords(elem: TDomElement): TElementPosition{
    const boxRect = elem!.getBoundingClientRect();
    return {
      top: boxRect.top,
      right: window.innerWidth - boxRect.right, // так как elem.getBoundingClientRect().right - это elem.left + elem.width
      bottom: boxRect.bottom,
      left: boxRect.left
    };
  }
}

export default new EX_GetMeasurements()