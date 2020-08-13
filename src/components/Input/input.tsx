import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'

// Input props 并交叉 HTMLDOM 竖属性
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  className?: string;
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {

  // 取出各种的属性
  const { className, disabled, size, icon, prepend, append, ...restProps } = props;
  // 根据属性得出不同的 className
  const classes = classNames('input-wrapper', className, {
    [`input-wrapper-${size}`]: size,
    [`input-wrapper-icon`]: !!icon
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(restProps.value)
  }

  return (
    <div
      className={classes}
    >
      {prepend && <div className="input-prepend">{prepend}</div>}
      <input
        data-testid="input"
        className='input-inner'
        disabled={disabled}
        {...restProps}
      />
      {icon && <Icon className="input-suffix" icon={icon} />}
      {append && <div className="input-append">{append}</div>}
    </div>

  )
}

export default Input;