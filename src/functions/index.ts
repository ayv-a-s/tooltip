import { TOptionsTooltip } from "@/classes/types/optionsTooltip";

import $Tooltip from "@/classes/Tooltip";
import EX_TipsComponent from '@/classes/GetTipsСomponents'

function initTooltip():void {
  const links = document.querySelectorAll<HTMLElement>('[data-tooltip]');
  links.forEach((item)=>{
    const prop: TOptionsTooltip = JSON.parse(item.getAttribute('data-tooltip')!);

    return new $Tooltip(prop, item)
  })

 /* EX_TipsComponent.target = target;
  return new $Tooltip(props)*/
}
export default initTooltip;