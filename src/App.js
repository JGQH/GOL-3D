import { useState } from 'react';

import Grid from './aux/Grid'
import Drawer from './sections/Drawer';
import Controller, { initialState } from './sections/Controller';

const App = () => {
  const [grid, setGrid] = useState(new Grid(initialState));

  function doGrid(data) {
    const newGrid = new Grid(data);
    setGrid(newGrid);
  }

  return (
  <>
    <div className="gol-drawer">
      <Drawer grid={grid} />
    </div>
    <div className="gol-controller">
      <Controller doGrid={doGrid} />
    </div>
  </>);
}

export default App;
