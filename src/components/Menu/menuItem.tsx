import React, { useContext,FC,CSSProperties } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string,
  disabled?: boolean,
  className?: string,
  style?: CSSProperties,
}

export const MenuItem: FC<MenuItemProps> = (props) => {

  const { style, className, index, disabled, children } = props;

  const context = useContext(MenuContext);

  const classes = classNames('menu-item', className, {
    'is-active': context.index === index,
    'is-disabled': disabled,
  })

  const handleClick = () => {
    if (!disabled && context.onSelect && (typeof index === 'string')) {
      context.onSelect(index);
    }
  }

  return (
    <li
      style={style}
      className={classes}
      onClick={handleClick}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem;