import React, { useState, useRef, createContext, CSSProperties, FC, RefObject } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectedCallback = (selectedIndex: string) => void
export interface MenuProps {
  className?: string;
  style?: CSSProperties;
  mode?: MenuMode;
  defaultIndex?: string;
  onSelect?: SelectedCallback;
  defaultOpenSubMenu?: string[]
}
interface IMenuContext {
  index: string;
  onSelect?: SelectedCallback;
  mode?: MenuMode;
  defaultOpenSubMenu?: string[];
  componentRef?: RefObject<HTMLElement>;
}

export const MenuContext = createContext<IMenuContext>({ index: '0' }) // 理论上应传入 Menu.defaultProps.defaultIndex

export const Menu: FC<MenuProps> = (props) => {
  const { className, style, mode, defaultIndex, onSelect, children, defaultOpenSubMenu } = props;

  const [currentActive, setActive] = useState(defaultIndex);
  const componentRef = useRef<HTMLUListElement>(null)

  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  });

  const handleClick = (index: string) => {
    setActive(index)
    onSelect && onSelect(index);
  }

  const passedContext: IMenuContext = {
    index: !currentActive ? '0' : currentActive,
    onSelect: handleClick,
    mode,
    defaultOpenSubMenu,
    componentRef
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // return childElement
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul
      ref={componentRef}
      style={style}
      className={classes}
      data-testid="test-menu"
    >
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenu: []
}

export default Menu;
