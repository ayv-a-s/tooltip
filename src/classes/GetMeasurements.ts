import { TElemCoords } from '@/classes/types/elemCoords'
import { TElemTooltip } from "@/classes/types/elemTooltip";

type TInfo = {
  width: number,
  height: number
} & TElemCoords

interface IGetMeasurements{
  getInfo(el: TElemTooltip): TInfo
}

const EX_GetMeasurements = class $GetMeasurements implements IGetMeasurements {

  getInfo(el: TElemTooltip): TInfo{
    return {
      width:  this.getWidth(el),
      height: this.getHeight(el),
      left: this.getElemCoords(el).left,
      right: this.getElemCoords(el).right,
      top: this.getElemCoords(el).top,
      bottom: this.getElemCoords(el).bottom
    }
  }

  private getWidth(elem: TElemTooltip): number{
    return elem!.offsetWidth;
  }

  private getHeight(elem: TElemTooltip): number {
    return elem!.offsetHeight
  }

  private getElemCoords(elem: TElemTooltip): TElemCoords{
    const boxRect = elem!.getBoundingClientRect();

    return {
      top: boxRect.top,
      right: boxRect.right,
      bottom: boxRect.bottom,
      left: boxRect.left
    };
  }
}

export default new EX_GetMeasurements()