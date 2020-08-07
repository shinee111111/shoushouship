import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
import Button from './components/Button/button'

library.add(fas)

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
      <header className="App-header">

        <Menu
          defaultIndex={"0"}
          onSelect={(index) => { console.log(index) }}
          defaultOpenSubMenu={['2']}
          mode="vertical"
        >
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>
              dropdown 1
          </MenuItem>
            <MenuItem>
              dropdown 2
          </MenuItem>
            <MenuItem>
              dropdown 2
          </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link 3
          </MenuItem>
        </Menu>

        <Button size='lg' onClick={() => { setShow(!show) }}> Toggle </Button>

        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>

        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
          wrapper
        >
          <Button btnType="primary" size="lg">A Large Button</Button>
        </Transition>

      </header>
    </div>
  );
}

export default App;
