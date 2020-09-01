import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
export var MenuItem = function (props) {
    var style = props.style, className = props.className, index = props.index, disabled = props.disabled, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-active': context.index === index,
        'is-disabled': disabled,
    });
    var handleClick = function () {
        if (!disabled && context.onSelect && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { style: style, className: classes, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
