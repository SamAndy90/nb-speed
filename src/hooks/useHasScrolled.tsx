import { useState, useEffect } from 'react';

export const useHasScrolled = (threshold = 10) => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);

        setHasScrolled(window.scrollY > threshold);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return hasScrolled;
};

// Usage:
// const hasScrolled = useHasScrolled(10);
