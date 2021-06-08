import { useState, useEffect } from 'react';

export const useGrid = (state) => {
    const [size, setSize] = useState(1);
    const [cells, setCells] = useState([]);
    const [data, setData] = useState({});

    const build = ({ size, prob, bgt, blt, sgt, slt }) => {
        const newCells = createCells(size, prob / 100);
        const newData = { bgt, blt, sgt, slt };

        setSize(size);
        setCells(newCells);
        setData(newData);
    }

    const update = () => {
        //Update "reAlive" state of all cells
        const newCells = [...cells]
        checkCells(newCells, data);
        updateCells(newCells);
        setCells(newCells);
    }

    useEffect(() => {
        build(state);
    }, []);

    return {
        "size": size,
        "shifter": (size - 1) / 2,
        "rebuild": (newState) => build(newState),
        "map": (func) => mapCells(cells, func),
        "update": update
    }
}

function randomColor() {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);

    return { R, G, B }
}

function createCells(size, prob) {
    return [...new Array(size)].map((_, i) => {
        return [...new Array(size)].map((__, j) => {
            return [...new Array(size)].map((___, k) => ({
                i:i,
                j:j,
                k:k,

                color: randomColor(),
                isAlive: Math.random() > prob,
                reAlive: false
            }));
        });
    });
}

function mapCells(cells, func) {
    const planes = cells.map(plane => plane.reduce((p, c) => p.concat(c), []));
    const cube = planes.reduce((p, c) => p.concat(c), []);
    
    return cube.map((cell, n) => func(cell, n));
}

function loopCells(cells, func) {
    cells.forEach(planes => planes.forEach(row => row.forEach(cell => func(cell))));
}

function checkCells(cells, data) {
    const { bgt, blt, sgt, slt } = data;

    loopCells(cells, cell => {
        const { i, j, k } = cell;

        const surroundings = surroundingCells(i, j, k, cells);
        const count = surroundings.length;

        //Updating the cell
        if(cell.isAlive) {
            cell.reAlive = (sgt <= count) && (count <= slt);
            return;
        }

        cell.reAlive = (bgt <= count) && (count <= blt);
        if(cell.reAlive) {
            const colors = surroundings.map(cell => cell.color);

            let [R, G, B] = [0, 0, 0]

            for(const color of colors) {
                R += color.R;
                G += color.G;
                B += color.B;
            }

            R /= count;
            G /= count;
            B /= count;

            cell.color = { R, G, B };
        }
    });
}

function updateCells(cells) {
    loopCells(cells, cell => {
        [cell.isAlive, cell.reAlive] = [cell.reAlive, false];
    });
}

function getCell(i, j, k, cells) {
    try {
        return cells[i][j][k] || {isAlive:false};
    } catch (error) {
        return {isAlive:false};
    }
}

function surroundingCells(i, j, k, cells) {
    const surroundings = [];

    //Top Plane
    surroundings.push(getCell(i + 1, j + 1, k + 1, cells));
    surroundings.push(getCell(i + 1, j + 1, k, cells));
    surroundings.push(getCell(i + 1, j + 1, k - 1, cells));

    surroundings.push(getCell(i + 1, j, k + 1, cells));
    surroundings.push(getCell(i + 1, j, k, cells));
    surroundings.push(getCell(i + 1, j, k - 1, cells));

    surroundings.push(getCell(i + 1, j - 1, k + 1, cells));
    surroundings.push(getCell(i + 1, j - 1, k, cells));
    surroundings.push(getCell(i + 1, j - 1, k - 1, cells));

    //Middle Plane
    surroundings.push(getCell(i, j + 1, k + 1, cells));
    surroundings.push(getCell(i, j + 1, k, cells));
    surroundings.push(getCell(i, j + 1, k - 1, cells));

    surroundings.push(getCell(i, j, k + 1, cells));
    surroundings.push(getCell(i, j, k - 1, cells));

    surroundings.push(getCell(i, j - 1, k + 1, cells));
    surroundings.push(getCell(i, j - 1, k, cells));
    surroundings.push(getCell(i, j - 1, k - 1, cells));

    //Bottom Plane
    surroundings.push(getCell(i - 1, j + 1, k + 1, cells));
    surroundings.push(getCell(i - 1, j + 1, k, cells));
    surroundings.push(getCell(i - 1, j + 1, k - 1, cells));

    surroundings.push(getCell(i - 1, j, k + 1, cells));
    surroundings.push(getCell(i - 1, j, k, cells));
    surroundings.push(getCell(i - 1, j, k - 1, cells));

    surroundings.push(getCell(i - 1, j - 1, k + 1, cells));
    surroundings.push(getCell(i - 1, j - 1, k, cells));
    surroundings.push(getCell(i - 1, j - 1, k - 1, cells));

    return surroundings.filter(cell => cell.isAlive);
}