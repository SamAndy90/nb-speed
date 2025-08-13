import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

/**
 * Calls a callback function when a search param is found
 * @param key
 * @param onTrue
 */
export function useSearchParamEvent(key: string, onTrue: () => void) {
    //Will show twice in dev bc of strict mode

    const [param, setParam] = useQueryState(key);
    useEffect(() => {
        if (param) {
            onTrue();
            setParam(null);
        }
    }, [key, onTrue, param, setParam]);
}
