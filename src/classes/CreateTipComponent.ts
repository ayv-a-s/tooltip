import EX_Colors from '@/classes/SetColors'

import { TContentTooltip } from "@/classes/types/contentTooltip";


interface ICreateTooltip{
  createTooltip(): HTMLElement[]
}

const EX_CreateTooltip = class $CreateTooltip implements ICreateTooltip{
  private _theme: string;
  private _content: TContentTooltip;
  private _effect: string;

  set effect(value:string){
    this._effect = value;
  }
  get effect(): string{
    return this._effect
  }

  set theme(value:string){
    this._theme = value;
  }
  get theme(): string{
    return this._theme
  }

  set content(value:TContentTooltip){
    this._content = value;
  }
  get content():TContentTooltip{
    return this._content
  }

  constructor() {
    this._theme = '';
    this._content = '';
    this._effect = '';
  }

  createTooltip(): HTMLElement[]{
    const tipElement: HTMLElement = document.createElement("div") as HTMLElement;
    const bgColor = EX_Colors.setTipColor();
    const arrow = this.createArrow();

    tipElement.classList.add(
      'tooltip-container',
      'hidden',
      `tooltip-container_${this.theme}`
    );
    tipElement.style.setProperty('--tooltip-color', bgColor);
    tipElement.innerHTML  =  `<div>${this.content}</div>`;


    this.effect !== 'onFloat' ? tipElement.insertAdjacentElement("beforeend", arrow) : '';

    return [tipElement, arrow]
  }

  private createArrow(): HTMLElement{
    const arrow: HTMLElement = document.createElement("span") as HTMLElement;
    const arrowColor = EX_Colors.setArrowColor();

    arrow.classList.add(
      'tooltip-container__arrow'
    );
    arrow.style.setProperty('--arrow-color', arrowColor);

    return arrow
  }
}

export default new EX_CreateTooltip()