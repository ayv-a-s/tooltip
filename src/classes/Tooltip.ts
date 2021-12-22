import $CreateTooltip from "@/classes/CreateTipComponent";
import $TooltipPosition from "@/classes/SetTooltipPosition";

import { TContentTooltip } from "@/classes/types/contentTooltip";
import { TElemTooltip } from "@/classes/types/elemTooltip";
import { TOptionsTooltip } from "@/classes/types/optionsTooltip";

import '../assets/tooltip.css'

type TFinalComponent = {
  link: TElemTooltip,
  tooltip: TElemTooltip,
  arrow: TElemTooltip
}

interface ITooltip {
  readonly theme: string,
  readonly effect: string,
  readonly position: string,
  readonly content: TContentTooltip,
  isTooltipOpened: boolean
  finalComponents: TFinalComponent,
  setPosition(e?: MouseEvent): this,
  initTooltip(link: TElemTooltip): this
}

export default class $Tooltip implements ITooltip {
  readonly theme: string;
  readonly effect: string;
  readonly position: string;
  readonly content: TContentTooltip;
  readonly EX_TooltipPosition: $TooltipPosition;
  private _isTooltipOpened: boolean;
  private EX_CreateTooltip: $CreateTooltip;
  public finalComponents: TFinalComponent;

  set isTooltipOpened(state: boolean){
    this._isTooltipOpened = state;
    this.changeTipsState();
  }
  get isTooltipOpened(): boolean{
    return this._isTooltipOpened;
  }

  constructor(options: TOptionsTooltip) {
    this.theme = options?.theme ? options.theme : '';
    this.effect = options?.effect ? options.effect : 'onClick';
    this.position = options?.position ? options.position : 'top';
    this.content = options.content;
    this._isTooltipOpened = false;
    this.finalComponents = {
      link: null,
      tooltip: null,
      arrow: null
    }
    this.EX_CreateTooltip = new $CreateTooltip({
      theme: this.theme,
      content: this.content,
      effect: this.effect
    })
    this.EX_TooltipPosition = new $TooltipPosition(this.position)
  }

  initTooltip(link: TElemTooltip): this {
    const elem = this.EX_CreateTooltip.createTooltip();

    if (link) {
      link.insertAdjacentElement("beforeend",  elem.tooltip as HTMLElement);
      link.style.position = 'relative';
      link.style.cursor = 'pointer';

      this.finalComponents = {
        link: link,
        tooltip: elem.tooltip,
        arrow: elem.arrow
      }

      this.EX_TooltipPosition.finalComponents = this.finalComponents;
    } else {
      console.log('Не найдено элемента с укзанным id');
    }
    return this
  }
  setPosition(e?: MouseEvent): this{
    switch (this.effect){
     case 'onFloat':
       if (e) {
         this.EX_TooltipPosition.dynamicPosition(e.clientX, e.clientY);
       } else {
         this.EX_TooltipPosition.dynamicPosition(0, 0);
       }
      break;
      default:
        this.EX_TooltipPosition.staticPosition();
      break;
    }
    return this
  }

  private changeTipsState(): void {
    this.isTooltipOpened ?
      this.finalComponents.tooltip!.classList.remove('hidden') :
      this.finalComponents.tooltip!.classList.add('hidden');
  }
}