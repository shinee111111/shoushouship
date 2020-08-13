import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const defaultMenu = () => (
  <Menu defaultIndex={'1'} onSelect={action('selected')}>
    <MenuItem>
      item 1
    </MenuItem>
    <MenuItem>
      item 2
    </MenuItem>
    <MenuItem>
      item 3
    </MenuItem>
  </Menu>
)

const verticalMenu = () => (
  <Menu defaultIndex={'2'} mode='vertical'>
    <MenuItem disabled>
      item 1
    </MenuItem>
    <MenuItem>
      item 2
    </MenuItem>
    <MenuItem>
      item 3
    </MenuItem>
  </Menu>
)

const horizontalSubMenu = () => (
  <Menu mode='horizontal' defaultIndex="2" defaultOpenSubMenu={['2']}>
    <MenuItem>
      item 1
    </MenuItem>
    <MenuItem>
      item 2
    </MenuItem>
    <SubMenu title="SubMenu1">
      <MenuItem>
        item 3-1
      </MenuItem>
      <MenuItem>
        item 3-2
      </MenuItem>
    </SubMenu>
    <SubMenu title="SubMenu2">
      <MenuItem>
        item 4-1
      </MenuItem>
      <MenuItem>
        item 4-2
      </MenuItem>
    </SubMenu>
  </Menu>
)

const verticalSubMenu = () => (
  <Menu mode='vertical' defaultIndex="2-1" defaultOpenSubMenu={['2']}>
     <MenuItem>
      item 1
    </MenuItem>
    <MenuItem>
      item 2
    </MenuItem>
    <SubMenu title="SubMenu1">
      <MenuItem>
        item 3-1
      </MenuItem>
      <MenuItem>
        item 3-2
      </MenuItem>
    </SubMenu>
    <SubMenu title="SubMenu2">
      <MenuItem>
        item 4-1
      </MenuItem>
      <MenuItem>
        item 4-2
      </MenuItem>
    </SubMenu>
  </Menu>
)

storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
  .add('纵向 Menu', verticalMenu)
  .add('横向 subMenu', horizontalSubMenu)
  .add('纵向 subMenu', verticalSubMenu)
