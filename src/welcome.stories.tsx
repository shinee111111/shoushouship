import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 shoushouship 组件库</h1>
        <p>shoushouship 是作为 typescript 学习阶段的一套基础组件库</p>
        <h3>安装试试</h3>
        <code>
          npm install shoushouship --save
        </code>
      </>
    )
  }, {
    info: {
      disable: true // 隐藏参数类型说明
    }
  })