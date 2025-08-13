import { useState, useEffect, MutableRefObject } from 'react';

export const useContainerDimensions = (
    myRef: MutableRefObject<HTMLElement>
) => {
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const getDimensions = () => ({
            width: myRef.current.offsetWidth,
            height: myRef.current.offsetHeight,
            x: myRef.current.getBoundingClientRect().x,
            y: myRef.current.getBoundingClientRect().y,
        });

        const handleResize = () => {
            setDimensions(getDimensions());
        };

        if (myRef.current) {
            setDimensions(getDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [myRef]);

    return dimensions;
};
