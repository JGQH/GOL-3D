import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Cell from './../components/Cell';

const Drawer = ({ grid }) => {
    return (
    <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5}  />
        <spotLight position={[10, 10, 10]} angle={0.3} />
        {grid.map((cell, n) => {
            const position = [cell.i - grid.shifter, cell.j - grid.shifter, cell.k - grid.shifter];

            return <Cell key={n} position={position} isAlive={cell.isAlive} />
        })}
    </Canvas>)
}

export default Drawer;