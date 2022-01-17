import $Tooltip from "@/classes/Tooltip";
import EX_EventListener from "@/classes/SetEventsListeners";

import GetTooltipProperties from "./getTooltipProperties"

export default function InitTooltip():void {

  const links = document.querySelectorAll<HTMLElement>('[data-tooltip]');

  links.forEach((item)=>{
    try {
      const props = GetTooltipProperties(item);
      const elem = new $Tooltip(props).setTooltip(item).setTooltipPosition();
      EX_EventListener.attach(elem);
    } catch {
      console.error('There is no content for Tooltip');
      return
    }
  })
}
