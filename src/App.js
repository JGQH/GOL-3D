import { useEffect } from 'react';

import { useGrid } from './aux/Grid'
import Drawer from './sections/Drawer';
import Controller, { initialState } from './sections/Controller';
import { useToggle } from './aux/hooks';

const App = () => {
  const { size, shifter, rebuild, map, update } = useGrid(initialState);
  const [isAnimating, switchAnimation] = useToggle(false);

  function doGrid(newState) {
    switchAnimation(false);

    rebuild(newState);
  }

  useEffect(() => {
    if(isAnimating) {
      const doAnimation = setInterval(() => {
        update();
      }, 500);

      return () => clearInterval(doAnimation);
    }
  }, [isAnimating]);

  return (
  <>
    <div className="gol-drawer">
      <Drawer {...{size, shifter, map}} />
    </div>
    <div className="gol-controller">
      <Controller {...{isAnimating, switchAnimation, doGrid}} />
    </div>
  </>);
}

export default App;
