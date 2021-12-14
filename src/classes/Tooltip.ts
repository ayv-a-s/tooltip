import $AddListener from "@/classes/SetEventsListeners";
import $TipsComponents from "@/classes/GetTipsСomponents";
import $TooltipPosition from "@/classes/SetTooltipPosition";
import EX_Colors from "@/classes/SetColors";
import EX_CreateTooltip from "@/classes/CreateTipComponent";

import { TContentTooltip } from "@/classes/types/contentTooltip";
import { TElemTooltip } from "@/classes/types/elemTooltip";
import { TOptionsTooltip } from "@/classes/types/optionsTooltip";

import '../assets/tooltip.css'

interface ITooltip {
  theme: string,
  effect: string,
  position: string,
  content: TContentTooltip,
  bindProperties(): this,
  bindElements(link: TElemTooltip): this,
  initTooltip(link: TElemTooltip): this,
}

export default class $Tooltip implements ITooltip {
  theme: string;
  effect: string;
  position: string;
  content: TContentTooltip;

  public EX_Events: $AddListener = new $AddListener();
  public EX_TooltipPosition: $TooltipPosition= new $TooltipPosition();

  private EX_TipsComponent: $TipsComponents  = new $TipsComponents();

  constructor(options: TOptionsTooltip) {
    this.theme = options?.theme ? options.theme : '';
    this.effect = options?.effect ? options.effect : 'onClick';
    this.position = options?.position ? options.position : 'top';
    this.content = options.content;
  }

  bindProperties(): this {
    this.EX_TooltipPosition.position = this.position;

    this.EX_Events.event = this.effect;

    EX_CreateTooltip.theme = this.theme;
    EX_CreateTooltip.content = this.content;
    EX_CreateTooltip.effect = this.effect;

    EX_Colors.theme = this.theme;

    return this
  }

  bindElements(link: TElemTooltip): this {
    const tip = EX_CreateTooltip.createTooltip();

    this.EX_TipsComponent.link = link;
    this.EX_TipsComponent.tooltip = tip[0];
    this.EX_TipsComponent.arrow = tip[1];

    this.EX_TooltipPosition.link = link;
    this.EX_TooltipPosition.tooltip = tip[0];
    this.EX_TooltipPosition.arrow = tip[1];

    this.EX_Events.link = link;
    this.EX_Events.tooltip = tip[0];
    this.EX_Events.TooltipPosition = this.EX_TooltipPosition;

    return this
  }

  initTooltip(link: TElemTooltip): this {
    if (link) {
      link.insertAdjacentElement("beforeend",  this.EX_TipsComponent.tooltip as HTMLElement);
      link.style.position = 'relative';
      link.style.cursor = 'pointer';

      this.effect !== 'onFloat' ? this.EX_TooltipPosition.staticPosition() : this.EX_TooltipPosition.dynamicPosition(0,0);
      this.EX_Events.addEventListener();

    } else {
      console.log('Не найдено элемента с укзанным id');
    }
    return this
  }
}