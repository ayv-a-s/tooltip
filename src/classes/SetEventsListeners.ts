import $Tooltip from "@/classes/Tooltip"

interface IEvent {
  addEventListener(): this,
  changeTooltipState():void
}

export default class $AddListener implements IEvent{
  tips: $Tooltip[] = []

  constructor(arr: $Tooltip[]) {
    this.tips = arr;
  }

  addEventListener(): this{
    this.tips.forEach((item)=>{
      const link = item.finalComponents.link!;

      switch (item.effect){
        case 'onHover':
          link.onpointerover = ()=>{
            item.setPosition();
            item.isTooltipOpened = true;
          };
          link.onpointerleave = ()=>{
            item.isTooltipOpened  = false;
          };
          break;

        case 'onFloat':
          link.onmousemove = (e)=>{
            link.style.position = 'unset';
            item.setPosition(e);
            item.isTooltipOpened  = true;
          };
          link!.onmouseleave = ()=>{
            item.isTooltipOpened  = false;
          };
          break;

        default:
          link.onclick = ()=>{
            item.setPosition();
            item.isTooltipOpened = !item.isTooltipOpened
          };
          break;
      }
    })
    return this
  }

  changeTooltipState():void{
    document.onclick= (e) => {
      this.tips.forEach((item)=>{
        const link = item.finalComponents.link!;
        const tooltip = item.finalComponents.tooltip!;
        if (e.target !== link && !tooltip!.classList.contains('hidden'))
         item.isTooltipOpened = false;
      })
    }
    window.onresize = () =>{
      this.tips.forEach((item)=>{
        if (item.isTooltipOpened) item.setPosition();
      })
    }
  }

}

