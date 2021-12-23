import $SetColors from '@/classes/SetColors'

import { TProperties, TTrigger, TTheme, TContent } from "@/classes/types/Properties";

type TTooltipElements = {
  tooltip: HTMLElement,
  arrow: HTMLElement
}

interface ICreateTooltip{
  readonly theme: TTheme,
  readonly content: TContent,
  readonly trigger: TTrigger,
  createTooltip(): TTooltipElements
}

export default class $CreateTooltip implements ICreateTooltip{
  readonly theme: TTheme;
  readonly content: TContent;
  readonly trigger: TTrigger;
  private EX_SetColors: $SetColors;


  constructor(options: TProperties) {
    this.theme = options.theme;
    this.content = options.content;
    this.trigger = options.trigger;

    this.EX_SetColors = new $SetColors(this.theme);
  }

  public createTooltip(): TTooltipElements{
    const tipElement: HTMLElement = document.createElement("div") as HTMLElement;
    const bgColor = this.EX_SetColors.setTipColor();
    const arrow = this.createArrow();

    tipElement.classList.add(
      'tooltip-container',
      'hidden',
      `tooltip-container_${this.theme}`
    );
    tipElement.style.setProperty('--tooltip-color', bgColor);
    tipElement.innerHTML  =  `<div>${this.content}</div>`;


    this.trigger !== 'onFloat' ? tipElement.insertAdjacentElement("beforeend", arrow) : '';

    return {
      tooltip: tipElement,
      arrow: arrow
    }
  }

  private createArrow(): HTMLElement{
    const arrow: HTMLElement = document.createElement("span") as HTMLElement;
    const arrowColor = this.EX_SetColors.setArrowColor();

    arrow.classList.add('tooltip-container__arrow');
    arrow.style.setProperty('--arrow-color', arrowColor);

    return arrow
  }
}
