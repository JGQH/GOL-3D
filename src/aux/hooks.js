import { useState } from 'react';

export function useToggle(initialState) {
    const [toggle, setToggle] = useState(initialState);

    const doToggle = (newState = null) => {
        if(newState === null) {
            setToggle(!toggle);
            return;
        }

        setToggle(newState);
    };

    return [toggle, doToggle];
}