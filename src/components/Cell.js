function toHex(val) {
    const hex = Math.floor(val).toString(16);
    if(val < 16) {
        return "0" + hex;
    }
    return hex;
}

function getColor(color) {
    const R = toHex(color.R);
    const G = toHex(color.G);
    const B = toHex(color.B);

    return `#${R}${G}${B}`;
}

const Cell = ({position, color, isAlive}) => {
    return (
    <mesh position={position}>
        <boxBufferGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color={getColor(color)} opacity={isAlive ? 1 : 0} transparent={!isAlive} />
    </mesh>);
}

export default Cell