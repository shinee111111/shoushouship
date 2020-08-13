import React, { InputHTMLAttributes } from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Input, { InputProps } from './input'

const createInput = (props: InputProps = {}) => (
  <Input placeholder="placeholder" {...props} />
)
describe('test Input component', () => {

  let fn: any = null;
  beforeEach(() => {
    fn = jest.fn();
  })

  it('should appear in html [default]', () => {
    const wrapper = render(createInput({
      onChange: fn
    }))
    const inputRef = wrapper.getByTestId('input') as HTMLInputElement
    expect(inputRef).toBeInTheDocument();
    expect(inputRef).toHaveClass('input-inner')
    fireEvent.change(inputRef, { target: { value: '172' } });
    expect(fn).toHaveBeenCalled()
    expect(inputRef.value).toEqual('172');
  })

  it('should disabled [disabled = true]', () => {
    const wrapper = render(createInput({
      onClick: fn,
      disabled: true
    }))
    const inputRef = wrapper.getByPlaceholderText('placeholder') as HTMLInputElement
    expect(inputRef.disabled).toBeTruthy()
    fireEvent.click(inputRef)
    expect(fn).not.toHaveBeenCalled()
  })

  it('should have different size when [size = lg | sm]', () => {
    let wrapper, wrapperRef;
    wrapper = render(createInput({
      size: 'sm'
    }))
    wrapperRef = wrapper.container.querySelector('.input-wrapper');
    expect(wrapperRef).toHaveClass('input-wrapper-sm')
    cleanup()
    wrapper = render(createInput({
      size: 'lg'
    }))
    wrapperRef = wrapper.container.querySelector('.input-wrapper');
    expect(wrapperRef).toHaveClass('input-wrapper-lg')
  })

  it('should have two status that called prepand and append [prepand | append]', () => {
    const wrapper = render(createInput({
      prepend: 'https://'
    }))
    const prependRef = wrapper.container.querySelector('.input-prepend')
    expect(prependRef).toBeTruthy()
  })

})