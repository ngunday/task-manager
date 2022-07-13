import { useEffect, useState } from 'react';
import { LoadState } from '../model/UI';

export const useLoaded = (src = '', srcSet?: string): LoadState => {
    const [loaded, setLoaded] = useState<LoadState>(LoadState.Loading);

    useEffect(() => {
        if (!src && !srcSet) {
            return;
        }
        const image = new Image();

        let active = true;
        image.onload = () => active && setLoaded(LoadState.Loaded);
        image.onerror = () => active && setLoaded(LoadState.Error);

        image.src = src;
        if (srcSet) {
            image.srcset = srcSet;
        }

        () => {
            active = false;
        };
    }, [src, srcSet]);

    return loaded;
};
