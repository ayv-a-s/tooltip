/**
 * Инициализирующая функция InitTooltip
 *
 * Ищет элементы по атрибуту "data-tooltip", создает для них экземпляры
*/

import $Tooltip from "@/classes/Tooltip";
import EX_EventListener from "@/classes/SetEventsListeners";

import GetTooltipProperties from "@/functions/getTooltipProperties"

const tooltips: $Tooltip[] = []

export default function InitTooltip():void {
  const links = document.querySelectorAll<HTMLElement>('[data-tooltip]');

  links.forEach((item)=>{

    try {

      linkChecker(item).then(()=>{
        const props = GetTooltipProperties(item);
        const elem = new $Tooltip(props).setTooltip(item).setTooltipPosition();

        tooltips.push(elem);
        EX_EventListener.attach(elem);
      });

    } catch {
      console.error('There is no content for Tooltip');
      return
    }

  })
}

/**
* Функция проверяет, был ли ранее добавлен тултип на элемент
* Если да, то удаляет его и отписывает от событий
**/
function linkChecker(link: HTMLElement): Promise<void> {

  return new Promise((resolve)=>{
    tooltips.forEach((tip) => {
      if (tip.finalComponents.link === link) {
        for (let i = 0; i < link.children.length; i++){
          if (link.children[i].classList.contains('tooltip-container')) {
            link.removeChild(link.children[i]);
          }
        }
        EX_EventListener.detach(tip)
      }
    })
    resolve()
  })
}
