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
                }));
            })
        });
    }
  
    map(func) {
        const planes = this.cells.map(plane => plane.reduce((p, c) => p.concat(c)));
        const cells = planes.reduce((p, c) => p.concat(c));
    
        return cells.map((val, n) => func(val, n));
    }
}

export default Grid;