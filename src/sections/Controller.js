import { useReducer } from 'react';

const initialState = {
    "size": 5,
    "prob": 75
}

function reducer(data, action) {
    const { prop, val } = action;

    const newData = {...data};
    newData[prop] = val;

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
        <div>
            <button onClick={() => doGrid(data)} >Apply changes</button>
        </div>
    </>)
}

export default Controller;