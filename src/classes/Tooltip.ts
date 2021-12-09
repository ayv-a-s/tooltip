import EX_CreateTooltip from '@/classes/CreateTipComponent';
import EX_TooltipPosition from '@/classes/SetTooltipPosition';
import EX_ArrowPosition from "@/classes/SetArrowPosition";
import EX_Colors from "@/classes/SetColors";
import $TipsComponents from '@/classes/GetTipsСomponents'
import $AddListener from "@/classes/SetEventsListeners"

import '../assets/tooltip.css'

import { TContentTooltip } from "@/classes/types/contentTooltip";
import { TOptionsTooltip } from "@/classes/types/optionsTooltip";
import { TElemTooltip } from "@/classes/types/elemTooltip";


interface ITooltip {
  theme: string,
  effect: string,
  position: string,
  content: TContentTooltip,
  bindProperties(): this,
  bindElements(link: TElemTooltip): this,
  initTooltip(link: TElemTooltip): void
}

export default class $Tooltip implements ITooltip {
  theme: string;
  effect: string;
  position: string;
  content: TContentTooltip;

  private EX_TipsComponent: $TipsComponents  = new $TipsComponents();
  private EX_Events: $AddListener = new $AddListener();


  constructor(options: TOptionsTooltip) {
    this.theme = options?.theme ? options.theme : '';
    this.effect = options?.effect ? options.effect : 'onClick';
    this.position = options?.position ? options.position : 'top';
    this.content = options.content;
  }

  bindProperties(): this {
    EX_TooltipPosition.position = this.position;

    EX_ArrowPosition.position = this.position;

    EX_CreateTooltip.theme = this.theme;
    EX_CreateTooltip.content = this.content;
    EX_CreateTooltip.effect = this.effect;

    EX_Colors.theme = this.theme;
    this.EX_Events.event = this.effect;

    return this
  }

  bindElements(link: TElemTooltip): this {
    const tip = EX_CreateTooltip.createTooltip();

    this.EX_TipsComponent.link = link;
    this.EX_TipsComponent.tooltip = tip[0];
    this.EX_TipsComponent.arrow = tip[1];

    this.EX_Events.link = link;
    this.EX_Events.tooltip = tip[0];

    EX_TooltipPosition.link = link;
    EX_TooltipPosition.tooltip = tip[0];

    EX_ArrowPosition.link = link;
    EX_ArrowPosition.tooltip = tip[0];
    EX_ArrowPosition.arrow = tip[1];

    return this
  }


  initTooltip(link: TElemTooltip): void {
    if (link) {
      link.insertAdjacentElement("beforeend",  this.EX_TipsComponent.tooltip as HTMLElement);
      link.style.position = 'relative';
      link.style.cursor = 'pointer';

      this.EX_Events.addEventListener();
    } else {
      console.log('Не найдено элемента с укзанным id');
    }

    if (this.effect !== 'onFloat') EX_TooltipPosition.staticPosition()
  }
}