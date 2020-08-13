import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, wait, cleanup } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps } from './autoComplete'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

config.disabled = true

library.add(fas)

const testArray = [
  { value: 'ab', number: 172 },
  { value: 'abc', number: 75 },
  { value: 'b', number: 120 },
  { value: 'c', number: 1 },
  { value: 'd', number: 15 },
]

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query: string) => testArray.filter(item => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {

  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
  })

  it('test basic AutoComplete behavior', async () => {
    // 测试正常功能
    expect(inputNode).toBeInTheDocument();
    fireEvent.change(inputNode, { target: { value: "a" } })
    await wait(() => {
      const dropdowns = wrapper.container.querySelectorAll('.suggestion-item')
      expect(dropdowns.length).toEqual(2)
    })
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 172 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('ab')
  })

  it('should provide keyboard support', async () => {

    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    const firstResult = wrapper.queryByText('ab');
    const secondResult = wrapper.queryByText('abc');
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('is-active')
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('is-active')
    // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('is-active')
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 172 })
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('click outside should hide the dropdown', async () => {
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })

  it('renderOption should generate the right template', async () => {
    cleanup();
    wrapper = render(
      <AutoComplete
        {...testProps}
        renderOption={(item) => (<h1>{item.value}</h1>)}
      />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.getByText('ab')).toBeInTheDocument()
      expect(wrapper.getByText('ab').tagName).toBe('H1')
    })
  })

  it('async fetchSuggestion should works fine', async () => {
    cleanup();
    const handleFetchPromise = (query: string) => {
      return Promise.resolve([{ value: 'shoushou', number: 2020 }])
    }
    wrapper = render(
      <AutoComplete
        {...testProps}
        fetchSuggestions={handleFetchPromise}
      />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 's' } })
    await wait(() => {
      expect(wrapper.getByText('shoushou')).toBeTruthy()
    })
  })

})