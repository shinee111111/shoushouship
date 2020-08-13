import React, { FC, useState, useRef, useEffect, ChangeEvent, KeyboardEvent, ReactElement } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transition/transition'

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 自定义筛选逻辑 */
  fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 选中项回调 */
  onSelect?: (item: DataSourceType) => void;
  /** 筛选列表渲染模板 */
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {

  const {
    value,
    fetchSuggestions,
    onSelect,
    renderOption,
    ...restProps
  } = props;

  // 受控组件 外部的 value 为 Input 的 defaultValue
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)

  const debouncedValue = useDebounce(inputValue, 1000);
  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {

    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue) // 假定为同步
      if (results instanceof Promise) {
        console.log('trigger Promise')
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)

  }, [debouncedValue])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // 回车
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38: // 向上
        highlight(highlightIndex - 1)
        break
      case 40: // 向下
        highlight(highlightIndex + 1)
        break
      case 27: // esc
        setSuggestions([])
        break
      default:
        break
    }
  }

  // Input 自身触发的 onChange 事件 去完成自身的值改 以及 筛选体改
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
    setSuggestions([])
  }

  // 渲染模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  // 生成筛选内容
  const generateDropdown = () => (
    <Transition
      in={suggestions.length > 0 || loading}
      animation="zoom-in-top"
      timeout={300}
    // onExited={() => { setSuggestions([]) }}
    >
      <ul className="viking-suggestion-list">
        {loading &&
          <div className="suggstions-loading-icon">
            <Icon icon="spinner" spin />
          </div>
        }
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex
          })
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    </Transition>
  )

  // 选中项回调
  const handleSelect = (item: DataSourceType) => {
    triggerSearch.current = false;
    setInputValue(item.value);
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  )

}

export default AutoComplete;