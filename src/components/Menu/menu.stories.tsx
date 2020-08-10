import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

const defaultButton = () => (
  <h3>Menu</h3>
)

storiesOf('Menu Component', module)
  .add('Menu', defaultButton)