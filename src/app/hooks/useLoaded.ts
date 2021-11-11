import React from 'react';
import { LoadState } from '../model/Shapes';

export const useLoaded = (src = '', srcSet?: string): LoadState => {
  const [loaded, setLoaded] = React.useState<LoadState>(LoadState.LOADING);

  React.useEffect(() => {
    if (!src && !srcSet) {
      return;
    }
    const image = new Image();

    let active = true;
    image.onload = () => active && setLoaded(LoadState.LOADED);
    image.onerror = () => active && setLoaded(LoadState.ERROR);

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
