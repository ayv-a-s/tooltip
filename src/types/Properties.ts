export type TTheme =  'error' | 'warning' | 'success' | 'fill'
export type TTrigger = 'onHover' | 'onClick' |  'onFloat'
export type TPosition = 'top' | 'left' | 'bottom' | 'right'
export type TContent =  HTMLElement | string ;

export type TProperties =  {
  theme: TTheme,
  trigger: TTrigger,
  position: TPosition,
  content: TContent
};

