import $Tooltip from "@/classes/Tooltip";

interface IGlobalEvents {
  changeTooltipState(): void;
  tips: $Tooltip[]
}

export default class $SetGlobalEvents implements IGlobalEvents{
  tips: $Tooltip[] = []

  constructor(arr: $Tooltip[]) {
    this.tips = arr;
  }

  changeTooltipState():void{
    document.onclick= (e) => {
      this.tips.forEach((item)=>{
        e.target !== item.EX_Events.link && !item.EX_Events.tooltip!.classList.contains('hidden') ?
          item.EX_Events.isOpened = false : '';
      })
    }
    window.onresize = () =>{
      this.tips.forEach((item)=>{
        if (item.EX_Events.isOpened) {
          item.effect !== 'onFloat' ? item.EX_TooltipPosition.staticPosition() : item.EX_TooltipPosition.dynamicPosition(0,0);
        }
      })
    }
  }
}

