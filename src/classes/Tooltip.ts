import EX_CreateTooltip from '@/classes/CreateTipComponent';
import EX_TooltipPosition from '@/classes/SetTooltipPosition';
import $TipsComponents from '@/classes/GetTipsСomponents'
import EX_ArrowPosition from "@/classes/SetArrowPosition";
import EX_Colors from "@/classes/SetColors";
import EX_Events from "@/classes/SetEventsListeners"


import '../assets/tooltip.css'

import { TContentTooltip } from "@/classes/types/contentTooltip";
import { TOptionsTooltip } from "@/classes/types/optionsTooltip";
import { TElemTooltip } from "@/classes/types/elemTooltip";


interface ITooltip {
  theme: string,
  effect: string,
  position: string,
  content: TContentTooltip,
  initTooltip(): void,
  EX_TipsComponent: $TipsComponents
}

export default class $Tooltip implements ITooltip {
  theme: string;
  effect: string;
  position: string;
  content: TContentTooltip;
  EX_TipsComponent: $TipsComponents  = new $TipsComponents();


  constructor(options: TOptionsTooltip, link: TElemTooltip) {
    this.theme = options?.theme ? options.theme : '';
    this.effect = options?.effect ? options.effect : 'onClick';
    this.position = options?.position ? options.position : 'top';
    this.content = options.content;
    this.EX_TipsComponent.link = link
    console.log(this.EX_TipsComponent.link);

    this.bindValues();
    this.initTooltip();

  }

  private bindValues(): void {
    EX_TooltipPosition.position = this.position;
    EX_TooltipPosition.link = this.EX_TipsComponent.link;

    EX_ArrowPosition.position = this.position;
    EX_ArrowPosition.link = this.EX_TipsComponent.link;


    EX_CreateTooltip.theme = this.theme;
    EX_CreateTooltip.content = this.content;
    EX_CreateTooltip.effect = this.effect;
    EX_Colors.theme = this.theme;
    EX_Events.event = this.effect;
    EX_Events.link = this.EX_TipsComponent.link;

  }

  initTooltip(): void {
    const link = this.EX_TipsComponent.link;
    const tip = EX_CreateTooltip.createTooltip();

    this.EX_TipsComponent.tooltip = tip[0];
    this.EX_TipsComponent.arrow = tip[1];

    EX_TooltipPosition.tooltip = tip[0];
    EX_ArrowPosition.tooltip = tip[0];
    EX_Events.tooltip = tip[0];

    EX_ArrowPosition.arrow = tip[1];

    if (link) {
      link.insertAdjacentElement("beforeend", tip[0]);
      link.style.position = 'relative';
      link.style.cursor = 'pointer';

      EX_Events.addEventListener();
    } else {
      console.log('Не найдено элемента с укзанным id');
    }

    if (this.effect !== 'onFloat') EX_TooltipPosition.staticPosition()
  }
}