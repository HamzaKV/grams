import { useRef } from 'react';
import AppContext from './context';
import createStore, { StateKeys } from '../utils/create-store';
import type { GramModels } from '../types/gram';
import type { Component } from '../types/component';
import { StateMap } from '../models/state-map';

interface IProps {
    models: GramModels;
}

const Provider: Component<IProps> = ({ models, children }) => {
    // using a ref to ensure the entire component is not re-rendered when any part of the state changes.
    // Component(s) should only be re-rendered when signaled to.
    const mapRef = useRef<{
        stateMap: StateMap;
        stateKeys: StateKeys;
    }>(createStore(models));

    return (
        <AppContext.Provider
            value={{
                map: mapRef.current.stateMap,
                stateKeys: mapRef.current.stateKeys,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default Provider;
