import $Tooltip from "@/classes/Tooltip"

interface IEvent {
  readonly tips: $Tooltip[]
  addLocalEvents(): this,
  addGlobalEvents():void
}

export default class $AddListener implements IEvent{
  readonly tips: $Tooltip[] = []

  constructor(arr: $Tooltip[]) {
    this.tips = arr;
  }

  public addLocalEvents(): this{
    this.tips.forEach((item)=>{
      const link = item.finalComponents.link;
      if (link) {
        switch (item.trigger){
          case 'onHover':
            link.onpointerover = ()=>{
              item.setTooltipPosition();
              item.isTooltipOpened = true;
            };
            link.onpointerleave = ()=>{
              item.isTooltipOpened  = false;
            };
            break;

          case 'onFloat':
            link.onmousemove = (e)=>{
              link.style.position = 'unset';
              item.setTooltipPosition(e);
              item.isTooltipOpened  = true;
            };
            link.onmouseleave = ()=>{
              item.isTooltipOpened  = false;
            };
            break;

          default:
            link.onclick = ()=>{
              item.setTooltipPosition();
              item.isTooltipOpened = !item.isTooltipOpened
            };
            break;
        }
      } else console.error('Link for Tooltip is not defined');
    })
    return this
  }

  public addGlobalEvents():void{
    document.onclick= (e) => {
      this.tips.forEach((item)=>{
        const link = item.finalComponents.link;
        const tooltip = item.finalComponents.tooltip;

        if (link && tooltip) {

          if (e.target !== link && !tooltip.classList.contains('hidden'))
            item.isTooltipOpened = false;

        } else
          console.error('Link for Tooltip is not defined');

      })
    }
    window.onresize = () =>{
      this.tips.forEach((item)=>{
        item.setTooltipPosition();
      })
    }
  }

}

