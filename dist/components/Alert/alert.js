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
export var AlertType;
(function (AlertType) {
    AlertType["Success"] = "success";
    AlertType["Default"] = "default";
    AlertType["Danger"] = "danger";
    AlertType["Warning"] = "warning";
})(AlertType || (AlertType = {}));
var Alert = function (props) {
    var _a, _b, _c, _d;
    var className = props.className, title = props.title, content = props.content, alertType = props.alertType, canClose = props.canClose, resetProps = __rest(props, ["className", "title", "content", "alertType", "canClose"]);
    var classesMap = {
        container: classNames('alert', className, (_a = {},
            _a["alert-" + alertType] = alertType,
            _a)),
        title: classNames('alert-title', (_b = {},
            _b["alert-title--" + alertType] = alertType,
            _b)),
        content: classNames('alert-content', (_c = {},
            _c["alert-content--" + alertType] = alertType,
            _c)),
        closeBtn: classNames('alert-closeBtn', (_d = {},
            _d["alert-closeBtn--" + alertType] = alertType,
            _d)),
    };
    return (React.createElement("div", __assign({ className: classesMap.container }, resetProps),
        title &&
            React.createElement("p", { className: classesMap.title }, title),
        React.createElement("p", { className: classesMap.content }, content),
        canClose &&
            React.createElement("div", { className: classesMap.closeBtn }, "Close")));
};
Alert.defaultProps = {
    content: 'this is a tip',
    alertType: AlertType.Default,
    canClose: false
};
export default Alert;
