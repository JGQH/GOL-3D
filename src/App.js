import { useState } from 'react';

import Grid from './aux/Grid'
import Drawer from './sections/Drawer';
import Controller from './sections/Controller';

const App = () => {
  const [grid, setGrid] = useState(new Grid(5));

  return (
  <>
    <div className="gol-drawer">
      <Drawer grid={grid} />
    </div>
    <div className="gol-controler">
      <Controller />
    </div>
  </>);
}

export default App;
