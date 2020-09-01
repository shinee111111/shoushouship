import React, { useState, useRef, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0' }); // 理论上应传入 Menu.defaultProps.defaultIndex
export var Menu = function (props) {
    var className = props.className, style = props.style, mode = props.mode, defaultIndex = props.defaultIndex, onSelect = props.onSelect, children = props.children, defaultOpenSubMenu = props.defaultOpenSubMenu;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var componentRef = useRef(null);
    var classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    var handleClick = function (index) {
        setActive(index);
        onSelect && onSelect(index);
    };
    var passedContext = {
        index: !currentActive ? '0' : currentActive,
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenu: defaultOpenSubMenu,
        componentRef: componentRef
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // return childElement
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (React.createElement("ul", { ref: componentRef, style: style, className: classes, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenu: []
};
export default Menu;
