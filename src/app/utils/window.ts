import { createContext } from 'react';

export const WindowContext = createContext<OpenFin.Window | undefined>(undefined);
export const WindowProvider = WindowContext.Provider;
