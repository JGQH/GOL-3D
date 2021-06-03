import { useState } from 'react';

import Grid from './aux/Grid'
import Drawer from './sections/Drawer';
import Controller from './sections/Controller';

const App = () => {
  const [grid, setGrid] = useState(new Grid(5, 0.75));

  function doGrid(data) {
    const { size, prob } = data;
    const [ rSize, rProb ] = [parseInt(size), parseInt(prob) / 100]

    const newGrid = new Grid(rSize, rProb);
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
