import $CreateTooltip from "@/classes/CreateTipComponent";
import $TooltipPosition from "@/classes/SetTooltipPosition";

import { TProperties, TPosition, TTrigger, TTheme, TContent } from "@/classes/types/Properties";
import { TDomElement } from "@/classes/types/DomElement";
import { TFinalComponent } from "@/classes/types/FinalComponent";

import '../assets/tooltip.css'

interface ITooltip {
  readonly theme: TTheme,
  readonly trigger: TTrigger,
  readonly position: TPosition,
  readonly content: TContent,
  isTooltipOpened: boolean,
  finalComponents: TFinalComponent,
  setTooltipPosition(e?: MouseEvent): this,
  setTooltip(link: TDomElement): this
}

export default class $Tooltip implements ITooltip {
  readonly theme: TTheme;
  readonly trigger: TTrigger;
  readonly position: TPosition;
  readonly content: TContent;
  readonly EX_TooltipPosition: $TooltipPosition;
  private _isTooltipOpened: boolean;
  private _finalComponents: TFinalComponent;
  private EX_CreateTooltip: $CreateTooltip;

  set isTooltipOpened(state: boolean){
    this._isTooltipOpened = state;
    this.setTooltipState();
  }
  get isTooltipOpened(): boolean{
    return this._isTooltipOpened;
  }
  set finalComponents(elem: TFinalComponent){
    this._finalComponents = elem;
  }
  get finalComponents(): TFinalComponent{
    return this._finalComponents;
  }

  constructor(options: TProperties) {
    this.theme = options.theme;
    this.trigger = options.trigger;
    this.position = options.position;
    this.content = options.content;
    this._isTooltipOpened = false;
    this._finalComponents = {
      link: null,
      tooltip: null,
      arrow: null
    }
    this.EX_CreateTooltip = new $CreateTooltip({
      theme: this.theme,
      content: this.content,
      trigger: this.trigger,
      position: this.position
    })
    this.EX_TooltipPosition = new $TooltipPosition(this.position)
  }

  public setTooltip(link: TDomElement): this {
    const elem = this.EX_CreateTooltip.createTooltip();

    if (link) {
      link.insertAdjacentElement("beforeend",  elem.tooltip);
      link.style.position = 'relative';
      link.style.cursor = 'pointer';

      this.finalComponents = {
        link: link,
        tooltip: elem.tooltip,
        arrow: elem.arrow
      }

      this.EX_TooltipPosition.finalComponents = this.finalComponents;
    } else {
      console.error('No item found with "data-tooltip"');
    }
    return this
  }
  public setTooltipPosition(e?: MouseEvent): this{
    switch (this.trigger){
     case 'onFloat':
       if (e) {
         this.EX_TooltipPosition.setDynamicPosition(e.clientX, e.clientY);
       } else {
         this.EX_TooltipPosition.setDynamicPosition(0, 0);
       }
      break;
      default:
        this.EX_TooltipPosition.setStaticPosition();
      break;
    }
    return this
  }

  private setTooltipState(): void {
    if (this.finalComponents.tooltip) {
      this.isTooltipOpened ?
        this.finalComponents.tooltip.classList.remove('hidden') :
        this.finalComponents.tooltip.classList.add('hidden');
    } else {
      console.error('Tooltip cant be opened cause its null or undefined');
    }
  }
}