import $Tooltip from "@/classes/Tooltip";
import $AddListener from "@/classes/SetEventsListeners";

import { TProperties, TPosition, TEffect, TTheme, TContent } from "@/classes/types/Properties";

enum Themes {
  'error',
  'warning',
  'success' ,
  'fill'
}
enum Effects {
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
          .initTooltip(item)
          .setPosition()
      )
    } catch {
      console.error('There is no content for Tooltip');
      return '';
    }
  })
  return new $AddListener(EX_Tooltips).addEventListener().changeTooltipState()
}

function GetProperties(item: HTMLElement): TProperties{
  //TODO: удалить пробелы из options
  const content = item.getAttribute('data-tooltip')!;
  const options = item.getAttribute('data-options')!;
  const props: TProperties = {
    theme : '',
    effect: 'onClick',
    position : 'top',
    content: content,
  }
  if (content.length === 0){
    console.error('Set Tooltips content!');
  }
  if (options) {
    options.split(',').forEach((point)=> {
      console.log(point);
      if (Object.values(Themes).includes(point)){
        props['theme'] = point as TTheme;
      } else if (Object.values(Effects).includes(point)){
        props['effect'] = point as TEffect;
      } else if (Object.values(Positions).includes(point)) {
        props['position'] = point as TPosition;
      }
    })
  }
  return props

}

export default initTooltip;