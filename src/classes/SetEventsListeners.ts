import $Tooltip from "@/classes/Tooltip"

interface IEvent {
  attach(observer: $Tooltip): void,
  detach(observer: $Tooltip):void
}

const EX_EventListener = class $AddListener implements IEvent{
  private observers: $Tooltip[] = [];
  private events: any;

  public detach(observer: $Tooltip):void {
    this.removeLocalEvents(observer);
  }
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
    this.events = new Events(item);
      if (link) {
        switch (item.trigger){
          case 'onHover':
            link.style.position = 'relative';
            link.addEventListener("pointerover", this.events)
            link.addEventListener("pointerleave", this.events)
            break;
          case 'onFloat':
            link.style.position = 'unset';
            link.addEventListener('mousemove', this.events)
            link.addEventListener('mouseleave', this.events)
            break;
          default:
            link.style.position = 'relative';
            link.addEventListener('click', this.events)
            break;
        }
      } else console.error('Link for Tooltip is not defined');
  }
  private removeLocalEvents(item: $Tooltip): void {
    const link = item.finalComponents.link;
    if (link) {
      switch (item.trigger){
        case 'onHover':
          link.removeEventListener("pointerover", this.events)
          link.removeEventListener("pointerleave", this.events)
          break;
        case 'onFloat':
          link.removeEventListener('mousemove', this.events)
          link.removeEventListener('mouseleave', this.events)
          break;
        default:
          link.removeEventListener('click',  this.events)
          break;
      }
    }
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


class Events {
  observer:$Tooltip;

  constructor(item: $Tooltip) {
    this.observer = item;
  }
  handleEvent(event: MouseEvent) {
    switch(event.type) {
      case 'pointerover':
        this.observer.setTooltipPosition();
        this.observer.isTooltipOpened = true;
        break;
      case 'mousemove':
        this.observer.setTooltipPosition(event);
        this.observer.isTooltipOpened  = true;
        break;
      case 'click':
        this.observer.setTooltipPosition();
        this.observer.isTooltipOpened = !this.observer.isTooltipOpened
        break;
      case 'pointerleave':
      case 'mouseleave':
        this.observer.isTooltipOpened  = false;
        break;
    }
  }
}