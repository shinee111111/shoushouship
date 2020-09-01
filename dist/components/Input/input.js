var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
export var Input = function (props) {
    var _a;
    // 取出各种的属性
    var className = props.className, disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, restProps = __rest(props, ["className", "disabled", "size", "icon", "prepend", "append"]);
    // 根据属性得出不同的 className
    var classes = classNames('input-wrapper', className, (_a = {},
        _a["input-wrapper-" + size] = size,
        _a["input-wrapper-icon"] = !!icon,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(restProps.value);
    }
    return (React.createElement("div", { className: classes },
        prepend && React.createElement("div", { className: "input-prepend" }, prepend),
        React.createElement("input", __assign({ "data-testid": "input", className: 'input-inner', disabled: disabled }, restProps)),
        icon && React.createElement(Icon, { className: "input-suffix", icon: icon }),
        append && React.createElement("div", { className: "input-append" }, append)));
};
export default Input;
