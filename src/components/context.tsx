import { createContext } from 'react';
import { StateMap as Map } from '../models/state-map';

export interface IContext {
    map: Map;
}

const AppContext = createContext<Partial<IContext>>({});

export default AppContext;
