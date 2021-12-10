interface IColors{
  theme: string,
  setArrowColor(): string,
  setTipColor(): string
}

const EX_Colors = class $SetColors implements IColors{
  private _theme: string;

  set theme(value:string){
    this._theme = value;
  }
  get theme(): string{
    return this._theme
  }

  constructor() {
    this._theme = 'fill';
  }

  setArrowColor(): string{
    switch (this.theme) {
      case 'warning':
        return '#d05358'
      case 'success':
        return '#32a071'
      default:
        return '#000'
    }
  }

  setTipColor(): string{
    switch (this.theme) {
      case 'warning':
        return '#d05358'
      case 'success':
        return '#32a071'
      case 'fill':
        return '#ffffff'
      default:
        return 'transparent'
    }
  }
}
export default new EX_Colors()