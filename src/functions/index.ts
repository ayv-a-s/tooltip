import { TOptionsTooltip } from "@/classes/types/optionsTooltip";

import $Tooltip from "@/classes/Tooltip";
import $AddListener from "@/classes/SetEventsListeners";

function initTooltip():void {
  const links = document.querySelectorAll<HTMLElement>('[data-tooltip]');
  const EX_Tooltips: $Tooltip[] = []

  links.forEach((item)=>{
    const prop: TOptionsTooltip = JSON.parse(item.getAttribute('data-tooltip')!);

    if (prop.content) {
      EX_Tooltips.push(
        new $Tooltip(prop)
        .initTooltip(item)
          .setPosition()
      )
    } else {
      console.log('Set Tooltips options');
    }
  })
  return new $AddListener(EX_Tooltips).addEventListener().changeTooltipState()
}
export default initTooltip;