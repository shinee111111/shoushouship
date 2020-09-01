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
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import Transition from '../Transition/transition';
export var AutoComplete = function (props) {
    var value = props.value, fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, restProps = __rest(props, ["value", "fetchSuggestions", "onSelect", "renderOption"]);
    // 受控组件 外部的 value 为 Input 的 defaultValue
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue, 1000);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue); // 假定为同步
            if (results instanceof Promise) {
                console.log('trigger Promise');
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: // 回车
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: // 向上
                highlight(highlightIndex - 1);
                break;
            case 40: // 向下
                highlight(highlightIndex + 1);
                break;
            case 27: // esc
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    // Input 自身触发的 onChange 事件 去完成自身的值改 以及 筛选体改
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
        setSuggestions([]);
    };
    // 渲染模板
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    // 生成筛选内容
    var generateDropdown = function () { return (React.createElement(Transition, { in: suggestions.length > 0 || loading, animation: "zoom-in-top", timeout: 300 },
        React.createElement("ul", { className: "viking-suggestion-list" },
            loading &&
                React.createElement("div", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true })),
            suggestions.map(function (item, index) {
                var cnames = classNames('suggestion-item', {
                    'is-active': index === highlightIndex
                });
                return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
            })))); };
    // 选中项回调
    var handleSelect = function (item) {
        triggerSearch.current = false;
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    return (React.createElement("div", { className: "viking-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
