/**
 *  Обрабатывает значения, переданные в атрибуты "data-tooltip" и "data-options"
 *  и возвращает в виде объекта
 *
 *  @param {HTMLElement} item - элемент, на который навешивается тултип
 *  @return {TProperties} props - извлеченные свойства тултипа
 * */

import { TPosition, TProperties, TTheme, TTrigger } from "@/types/Properties";

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
  const options = item.getAttribute('data-options');
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
    //Удаляет пробелы из строки и извлекает опции в виде массива
    options.replace(/\s/g, '').split(',').forEach((point)=> {

      //Проверяет, к какому свойству (Themes, Triggers или Positions) относится каждая извлеченная опция
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