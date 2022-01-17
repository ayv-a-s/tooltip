import { TPosition, TProperties, TTheme, TTrigger } from "@/classes/types/Properties";

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

export default function GetTooltipProperties(item: HTMLElement): TProperties{
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