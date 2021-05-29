import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cell from './components/Cell';

const App = () => {
  return (
  <Canvas>
    <OrbitControls />
    <ambientLight intensity={0.5}  />
    <spotLight position={[5, 10, 7]} angle={0.3} />
    <Cell />
  </Canvas>);
}

export default App;
