export type TTheme =  'error' | 'warning' | 'success' | 'fill' | ''
export type TEffect = 'onHover' | 'onClick' |  'onFloat'
export type TPosition = 'top' | 'left' | 'bottom' | 'right'
export type TContent =  HTMLElement | string ;

export type TProperties =  {
  theme?: TTheme,
  effect?: TEffect,
  position?: TPosition,
  content: TContent
};

