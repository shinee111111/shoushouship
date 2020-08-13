import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './input'

const ControlledInput = () => {
  const [value, setValue] = useState('')
  return <Input value={value} onChange={(e) => setValue(e.target.value)} />
}

const defaultInput = () => (
  <>
    <Input
      onChange={action('changed')} />
    <ControlledInput />
  </>
)

const disabledInput = () => (
  <Input disabled />
)

const iconInput = () => (
  <>
    <Input icon="moon" />
  </>
)

const sizeInput = () => (
  <>
    <Input icon="star" size='sm' /><br />
    <Input disabled /><br />
    <Input icon="sun" size='lg' /><br />
  </>
)

const appendInput = () => (
  <>
    <Input prepend="https://" /><br />
    <Input append=".com" /><br />
  </>
)

storiesOf('Input Component', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', appendInput)