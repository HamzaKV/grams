import { useRef } from 'react';
import AppContext from './context';
import createStore from '../utils/create-store';
import type { GramModels } from '../types/gram';
import type { Component } from '../types/component';
import { StateMap } from '../models/state-map';

interface IProps {
    models: GramModels;
}

let map: StateMap | null = null;

const Provider: Component<IProps> = ({ models, children }) => {
    if (!map) map = createStore(models).stateMap;
    // using a ref to ensure the entire component is not re-rendered when any part of the state changes.
    // Component(s) should only be re-rendered when signaled to.
    const mapRef = useRef(map);

    return (
        <AppContext.Provider value={{ map: mapRef.current }}>
            {children}
        </AppContext.Provider>
    );
};

export default Provider;
