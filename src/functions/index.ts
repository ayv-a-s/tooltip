import $Tooltip from "@/classes/Tooltip";
import $AddListener from "@/classes/SetEventsListeners";

import { TProperties, TPosition, TTrigger, TTheme } from "@/classes/types/Properties";

enum Themes {
  'error',
  'warning',
  'success' ,
  'fill'
}
enum Triggers {
  'onHover',
  'onClick',
  'onFloat'
}
enum Positions {
  'top' ,
  'left',
  'bottom',
  'right'
}

function initTooltip():void {

  const EX_Tooltips: $Tooltip[] = [];
  const links = document.querySelectorAll<HTMLElement>('[data-tooltip]');

  links.forEach((item)=>{
    try {
      EX_Tooltips.push(
        new $Tooltip(GetProperties(item))
          .setTooltip(item)
          .setTooltipPosition()
      )
    } catch {
      console.error('There is no content for Tooltip');
      return
    }
  })
  new $AddListener(EX_Tooltips).addLocalEvents().addGlobalEvents();
}

function GetProperties(item: HTMLElement): TProperties{
  const content = item.getAttribute('data-tooltip')!;
  const options = item.getAttribute('data-options')!;
  const props: TProperties = {
    theme : 'fill',
    trigger: 'onClick',
    position : 'top',
    content: content,
  }
  if (content.length === 0){
    console.error('Set Tooltips content!');
  }
  if (options) {
    options.replace(/\s/g, '').split(',').forEach((point)=> {
      if (Object.values(Themes).includes(point)){
        props['theme'] = point as TTheme;
      } else if (Object.values(Triggers).includes(point)){
        props['trigger'] = point as TTrigger;
      } else if (Object.values(Positions).includes(point)) {
        props['position'] = point as TPosition;
      }
    })
  }
  return props
}

export default initTooltip;