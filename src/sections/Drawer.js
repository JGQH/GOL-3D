import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cell from './../components/Cell';

const Drawer = ({ size, shifter, map }) => {
    return (
    <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5}  />
        <spotLight position={[5 + size, 7 + size , 9 + size]} angle={0.3} />
        {map((cell, n) => {
            const { color, isAlive } = cell;
            const position = [cell.i - shifter, cell.j - shifter, cell.k - shifter];

            return <Cell key={n} {...{position, color, isAlive}} />
        })}
    </Canvas>)
}

export default Drawer;