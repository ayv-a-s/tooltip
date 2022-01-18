import { TElementPosition } from '@/types/ElementPosition';

type TInfo = {
  width: number,
  height: number
} & TElementPosition

interface IGetMeasurements{
  getInfo(el: HTMLElement): TInfo
}

const EX_GetMeasurements = class $GetMeasurements implements IGetMeasurements {

  public getInfo(el: HTMLElement): TInfo{
    return {
      width:  this.getWidth(el),
      height: this.getHeight(el),
      left: this.getElemCoords(el).left,
      right: this.getElemCoords(el).right,
      top: this.getElemCoords(el).top,
      bottom: this.getElemCoords(el).bottom
    }
  }

  private getWidth(elem: HTMLElement): number{
    return elem.offsetWidth;
  }

  private getHeight(elem: HTMLElement): number {
    return elem.offsetHeight
  }

  private getElemCoords(elem: HTMLElement): TElementPosition{
    const boxRect = elem.getBoundingClientRect();
    return {
      top: boxRect.top,
      right: window.innerWidth - boxRect.right, // так как elem.getBoundingClientRect().right - это elem.left + elem.width
      bottom: boxRect.bottom,
      left: boxRect.left
    };
  }
}

export default new EX_GetMeasurements()