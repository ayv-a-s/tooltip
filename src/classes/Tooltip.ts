import $CreateTooltip from "@/classes/CreateTipComponent";
import $TooltipPosition from "@/classes/SetTooltipPosition";

import { TProperties, TPosition, TTrigger, TTheme, TContent } from "@/types/Properties";
import { TDomElement } from "@/types/DomElement";
import { TFinalComponent } from "@/types/FinalComponent";

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
  private _isTooltipOpened = false;
  private _finalComponents: TFinalComponent = {
    link: null,
    tooltip: null,
    arrow: null
  };
  private EX_CreateTooltip: $CreateTooltip;
  private EX_TooltipPosition: $TooltipPosition;

  constructor(options: TProperties) {
    this.theme = options.theme;
    this.trigger = options.trigger;
    this.position = options.position;
    this.content = options.content;
    this.EX_CreateTooltip = new $CreateTooltip(options);
    this.EX_TooltipPosition = new $TooltipPosition(this.position);
  }

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
