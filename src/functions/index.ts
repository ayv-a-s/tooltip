import { TOptionsTooltip } from "@/classes/types/optionsTooltip";

import $Tooltip from "@/classes/Tooltip";
import $SetGlobalEvents from '@/classes/SetGlobalEvents'

function initTooltip():void {
  const links = document.querySelectorAll<HTMLElement>('[data-tooltip]');
  const EX_Tooltip: $Tooltip[] = []

  links.forEach((item)=>{
    const prop: TOptionsTooltip = JSON.parse(item.getAttribute('data-tooltip')!);

    if (prop.content) {
      EX_Tooltip.push(
        new $Tooltip(prop)
        .bindProperties()
        .bindElements(item)
        .initTooltip(item)
      )
    } else {
      console.log('Укажите опции для tooltip');
    }
  })
  return new $SetGlobalEvents(EX_Tooltip).changeTooltipState();
}
export default initTooltip;