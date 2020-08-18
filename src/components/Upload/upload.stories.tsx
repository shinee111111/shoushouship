import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import Icon from '../Icon/icon'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 20 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 100 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 52 },
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {
    type: file.type
  })
  return Promise.resolve(newFile)
}

const SimpleUpload = () => (
  <Upload
    // defaultFileList={defaultFileList}
    action="https://jsonplaceholder.typicode.com/posts"
    onChange={action('changed')}
    onRemove={action('removed')}
    name="fileName"
    data={{ 'key': 'value' }}
    headers={{ 'X-Powered-By': 'shoushou' }}
    accept=".jpg"
    multiple
    drag
  >
    <Icon icon="upload" size="3x" theme='secondary' />
    <br />
    <p>Drag file over to upload</p>
  </Upload>
)

storiesOf('Upload Component', module)
  .addDecorator((generateFn) => (
    <div style={{ width: "320px" }}>
      {generateFn()}
    </div>
  ))
  .add('Upload', SimpleUpload)
