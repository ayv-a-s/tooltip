import $Tooltip from "@/classes/Tooltip"

interface IEvent {
  attach(observer: $Tooltip): void
}


const EX_EventListener = class $AddListener implements IEvent{
  private observers: $Tooltip[] = [];

  public attach(observer: $Tooltip): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
      this.addLocalEvents(observer);
      this.addGlobalEvents()
    }
  }

  private addLocalEvents(item: $Tooltip): void{
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
  }

  private addGlobalEvents():void{
    document.onclick= (e) => {
      this.observers.forEach((item)=> {
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
      this.observers.forEach((item)=>{
        item.setTooltipPosition();
      })
    }
  }

}

export default new EX_EventListener()