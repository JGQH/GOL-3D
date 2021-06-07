import { useReducer } from 'react';

export const initialState = {
    "size": 5,
    "prob": 75,
    "bgt": 4,
    "blt": 5,
    "sgt": 5,
    "slt": 5
}

function reducer(data, action) {
    const { prop, val } = action;

    const newData = {...data};
    newData[prop] = +val;

    return newData;
}

const Controller = ({ doGrid }) => {
    const [ data, dispatch ] = useReducer(reducer, initialState);

    function doDispatch(prop, val) {
        dispatch({"prop":prop, "val":val});
    }

    return (
    <>
        <div className="gol-size gol-control">
            <p>Size of grid: {data.size}</p>
            <input type="range" value={data.size} min={5} max={15} onChange={e => doDispatch("size", e.target.value)} />
        </div>
        <div className="gol-chance gol-control">
            <p>Initial chance: {data.prob}%</p>
            <input type="range" value={data.prob} min={25} max={90} onChange={e => doDispatch("prob", e.target.value)} />
        </div>
        <div className="gol-born gol-control">
            <p>Born if: {data.bgt}{" <= C <= "}{data.blt}</p>
            <input type="range" value={data.bgt} min={3} max={data.blt} onChange={e => doDispatch("bgt", e.target.value)} />
            <input type="range" value={data.blt} min={data.bgt} max={15} onChange={e => doDispatch("blt", e.target.value)} />
        </div>
        <div className="gol-survives gol-control">
            <p>Survives if: {data.sgt}{" <= C <= "}{data.slt}</p>
            <input type="range" value={data.sgt} min={3} max={data.slt} onChange={e => doDispatch("sgt", e.target.value)} />
            <input type="range" value={data.slt} min={data.sgt} max={15} onChange={e => doDispatch("slt", e.target.value)} />
        </div>
        <div>
            <button onClick={() => doGrid(data)} >Apply changes</button>
        </div>
    </>)
}

export default Controller;