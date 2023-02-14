import { createContext } from 'react';
import { StateMap as Map } from '../models/state-map';
import { StateKeys } from '../utils/create-store';

export interface IContext {
    map: Map;
    stateKeys: StateKeys;
}

const AppContext = createContext<Partial<IContext>>({});

export default AppContext;
