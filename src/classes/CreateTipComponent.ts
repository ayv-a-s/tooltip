import $SetColors from '@/classes/SetColors'

import { TContentTooltip } from "@/classes/types/contentTooltip";
import { TOptionsTooltip } from "@/classes/types/optionsTooltip";

type TTooltipElements = {
  tooltip: HTMLElement,
  arrow: HTMLElement
}

interface ICreateTooltip{
  readonly theme: string,
  readonly content: TContentTooltip,
  readonly effect: string,
  createTooltip(): TTooltipElements
}

export default class $CreateTooltip implements ICreateTooltip{
  readonly theme: string;
  readonly content: TContentTooltip;
  readonly effect: string;
  private EX_Colors:$SetColors;


  constructor(options: TOptionsTooltip) {
    this.theme = options.theme!;
    this.content = options.content!;
    this.effect = options.effect!;

    this.EX_Colors = new $SetColors(this.theme);
  }

  createTooltip(): TTooltipElements{
    const tipElement: HTMLElement = document.createElement("div") as HTMLElement;
    const bgColor = this.EX_Colors.setTipColor();
    const arrow = this.createArrow();

    tipElement.classList.add(
      'tooltip-container',
      'hidden',
      `tooltip-container_${this.theme}`
    );
    tipElement.style.setProperty('--tooltip-color', bgColor);
    tipElement.innerHTML  =  `<div>${this.content}</div>`;


    this.effect !== 'onFloat' ? tipElement.insertAdjacentElement("beforeend", arrow) : '';

    return {
      tooltip: tipElement,
      arrow: arrow
    }
  }

  private createArrow(): HTMLElement{
    const arrow: HTMLElement = document.createElement("span") as HTMLElement;
    const arrowColor = this.EX_Colors.setArrowColor();

    arrow.classList.add('tooltip-container__arrow');
    arrow.style.setProperty('--arrow-color', arrowColor);

    return arrow
  }
}
