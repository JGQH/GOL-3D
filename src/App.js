import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cell from './components/Cell';

class Grid {
  constructor(size) {
    this.size = size;
    this.shifter = (size - 1) / 2;

    this.cells = [...new Array(size)].map((_, i) => {
      return [...new Array(size)].map((__, j) => {
        return [...new Array(size)].map((___, k) => ({
          i: i,
          j: j,
          k: k,

          isAlive: Math.random() > 0.75,
          reAlive: false
        }))
      })
    })
  }

  map(func) {
    const planes = this.cells.map(plane => plane.reduce((p, c) => p.concat(c)));
    const cells = planes.reduce((p, c) => p.concat(c))

    return cells.map((val, n) => func(val, n))
  }
}

const App = () => {
  const [grid, setGrid] = useState(new Grid(5));

  return (
  <Canvas>
    <OrbitControls />
    <ambientLight intensity={0.5}  />
    <spotLight position={[10, 10, 10]} angle={0.3} />
    {grid.map((val, n) => {
      const position = [val.i - grid.shifter, val.j - grid.shifter, val.k - grid.shifter];

      return <Cell key={n} position={position} isAlive={val.isAlive} />
    })}
  </Canvas>);
}

export default App;
