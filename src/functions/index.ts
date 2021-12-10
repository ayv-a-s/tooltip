import { TOptionsTooltip } from "@/classes/types/optionsTooltip";

import $Tooltip from "@/classes/Tooltip";

function initTooltip():void {
  const links = document.querySelectorAll<HTMLElement>('[data-tooltip]');

  links.forEach((item)=>{
    const prop: TOptionsTooltip = JSON.parse(item.getAttribute('data-tooltip')!);

    if (prop.content) {

      const EX_Tooltip = new $Tooltip(prop)
        .bindProperties()
        .bindElements(item)
        .initTooltip(item)
        .closeTooltip()
    } else {
      console.log('Укажите опции для tooltip');
    }
  })



}
export default initTooltip;