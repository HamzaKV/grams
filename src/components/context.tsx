import { createContext } from 'react';
import { StateMap as Map } from '../models/state-map';
import { Tree } from '../models/state-tree';

export interface IContext {
    store: Tree<any>;
    map: Map;
}

const AppContext = createContext<Partial<IContext>>({});

export default AppContext;
