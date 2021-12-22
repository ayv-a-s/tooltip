import $CreateTooltip from "@/classes/CreateTipComponent";
import $TooltipPosition from "@/classes/SetTooltipPosition";

import { TDomElement } from "@/classes/types/DomElement";
import { TProperties, TPosition, TEffect, TTheme, TContent } from "@/classes/types/Properties";
import { TFinalComponent } from "@/classes/types/FinalComponent";

import '../assets/tooltip.css'

interface ITooltip {
  readonly theme: TTheme,
  readonly effect: TEffect,
  readonly position: TPosition,
  readonly content: TContent,
  isTooltipOpened: boolean
  finalComponents: TFinalComponent,
  setPosition(e?: MouseEvent): this,
  initTooltip(link: TDomElement): this
}

export default class $Tooltip implements ITooltip {
  readonly theme: TTheme;
  readonly effect: TEffect;
  readonly position: TPosition;
  readonly content: TContent;
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

  constructor(options: TProperties) {
    this.theme = options.theme!;
    this.effect = options.effect!;
    this.position = options.position!;
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

  initTooltip(link: TDomElement): this {
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
      console.log('No item found with "data-tooltip"');
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