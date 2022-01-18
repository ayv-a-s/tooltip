import { TTheme } from "@/types/Properties";

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

  public setArrowColor(): string{
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

  public setTipColor(): string{
    switch (this.theme) {
      case 'error':
        return '#d05358'
      case 'warning':
        return '#ffb002'
      case 'success':
        return '#32a071'
      default:
        return '#ffffff'
    }
  }
}