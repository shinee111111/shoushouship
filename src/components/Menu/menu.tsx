import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectedCallback = (selectedIndex: string) => void
export interface MenuProps {
  className?: string;
  style?: React.CSSProperties;
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
}

export const MenuContext = createContext<IMenuContext>({ index: '0' }) // 理论上应传入 Menu.defaultProps.defaultIndex

const Menu: React.FC<MenuProps> = (props) => {
  const { className, style, mode, defaultIndex, onSelect, children, defaultOpenSubMenu } = props;

  const [currentActive, setActive] = useState(defaultIndex);

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
    defaultOpenSubMenu
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
