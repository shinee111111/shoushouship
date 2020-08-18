import React, { MouseEvent } from 'react'
import { render, RenderResult, fireEvent, wait, createEvent } from '@testing-library/react'
import { Upload, UploadProps } from './upload'
import axios from 'axios'
import { IconProps } from '../Icon/icon'

/**
 * 对图标组件进行冒刻改造，将图标渲染 转变成 文字
 * 这样测试的时候就可以寻找文字 测试图标是否出现
 */

jest.mock('../Icon/icon', () => {
  return (props: IconProps) => {
    const { icon, onClick } = props;
    return <span onClick={onClick as React.MouseEventHandler}>{icon}</span> // 组件只会显示当前的 图标名称
  }
})

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios> // 转换成了 jest mock 对象

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })

describe('test upload component', () => {

  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement
    uploadArea = wrapper.getByText('Click to upload')
  })

  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    // 使用 mock 对象下的 mockImplementation 冒刻方法的实现
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ 'data': 'cool' })
    // })
    mockedAxios.post.mockResolvedValue({ 'data': 'cool' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    // expect(queryByText('spinner')).toBeInTheDocument();
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalled()
    expect(testProps.onChange).toHaveBeenCalled()

    // remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times') as HTMLElement)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        uid: expect.any(String),
        status: 'success',
        name: 'test.png',
      })
    )
  })

  it('upload error when net failed', async () => {
    // 冒刻失败情况
    const { queryByText } = wrapper;
    mockedAxios.post.mockRejectedValue('err')
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    await wait(() => {
      expect(queryByText('times-circle')).toBeInTheDocument()
    })
  })

  it('drag and drop files should works fine', async () => {
    const mockFn = testProps.onSuccess as jest.MockedFunction<() => {}>
    mockFn.mockClear();
    mockedAxios.post.mockResolvedValue({ data: 'success' })
    const { queryByText } = wrapper;
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover')

    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)

    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalled()
  })
})