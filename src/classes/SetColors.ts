import { TTheme } from "@/classes/types/Properties";

interface IColors{
  readonly theme:TTheme,
  setArrowColor(): string,
  setTipColor(): string
}

export default class $SetColors implements IColors{
  readonly theme:TTheme;

  constructor(theme: TTheme) {
    this.theme = theme;
  }

  setArrowColor(): string{
    switch (this.theme) {
      case 'error':
        return '#d05358'
      case 'warning':
        return '#ffb002'
      case 'success':
        return '#32a071'
      default:
        return '#000'
    }
  }

  setTipColor(): string{
    switch (this.theme) {
      case 'error':
        return '#d05358'
      case 'warning':
        return '#ffb002'
      case 'success':
        return '#32a071'
      case 'fill':
        return '#ffffff'
      default:
        return 'transparent'
    }
  }
}