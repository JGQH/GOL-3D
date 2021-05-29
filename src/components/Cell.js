const Cell = ({position, isAlive}) => {
    return (
    <mesh position={position}>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="#00FF00" opacity={isAlive ? 1 : 0} transparent={!isAlive} />
    </mesh>);
}

export default Cell