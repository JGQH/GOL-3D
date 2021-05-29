const Cell = () => {
    return (
    <mesh>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="#00FF00" />
    </mesh>);
}

export default Cell