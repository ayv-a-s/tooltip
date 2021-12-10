import { TOptionsTooltip } from "@/classes/types/optionsTooltip";

import $Tooltip from "@/classes/Tooltip";

function initTooltip():void {
  const links = document.querySelectorAll<HTMLElement>('[data-tooltip]');

  links.forEach((item)=>{

    const prop: TOptionsTooltip = JSON.parse(item.getAttribute('data-tooltip')!);

    const EX_Tooltip = new $Tooltip(prop)
      .bindProperties()
      .bindElements(item)
      .initTooltip(item)
  })

}
export default initTooltip;