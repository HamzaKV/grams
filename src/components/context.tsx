import { createContext } from 'react';
import { StateMap as Map } from '../models/state-map';

export interface IContext {
    map: Map;
    isReady: boolean;
}

const AppContext = createContext<Partial<IContext>>({});

export default AppContext;
