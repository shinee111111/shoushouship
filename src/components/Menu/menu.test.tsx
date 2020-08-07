import React from 'react'
import { render, fireEvent, RenderResult, cleanup, wait } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'
// awesome 图标库添加
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile;
  return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {

  // 每个例子之前
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile()) // CSS 文件插入
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  // 检测表现
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('should show dropdown items when hover on horizontal subMenu', async () => {
    const dropItem = wrapper.queryByText('drop1')
    expect(dropItem).toBeFalsy()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)

    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })

    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

    fireEvent.mouseLeave(dropdownElement)

    await wait(() => {
      expect(dropItem).toBeFalsy()
    })

  })

  it('should show ok when mode is vertical', async () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));

    // 1、当 mode 为 vertical 时，点击显示 dropdown
    const dropdownContainer = wrapper.getByText('dropdown')
    fireEvent.click(dropdownContainer)
    await wait(()=>{
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })

    // 2、测试 默认展开 下拉情况
    cleanup();
    const wrapper2 = render(generateMenu({ ...testVerProps, defaultOpenSubMenu: ['3'] }))
    const dropItem2 = wrapper2.queryByText('drop1')
    expect(dropItem2).toBeVisible()
  })

  // 检测行为
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    // 特殊 disabled 测试
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  // 检测 mode 
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu-vertical')
  })
});