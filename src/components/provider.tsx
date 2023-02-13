import { useRef, useState, useEffect } from 'react';
import AppContext from './context';
import createStore from '../utils/create-store';
import type { GramModels } from '../types/gram';
import type { Component } from '../types/component';
import { StateMap } from '../models/state-map';

interface IProps {
    models: GramModels;
}

const Provider: Component<IProps> = ({ models, children }) => {
    const [isReady, setIsReady] = useState(false);
    // using a ref to ensure the entire component is not re-rendered when any part of the state changes.
    // Component(s) should only be re-rendered when signaled to.
    const mapRef = useRef<StateMap | null>();

    useEffect(() => {
        mapRef.current = createStore(models).stateMap;
        setIsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppContext.Provider
            value={{ map: mapRef.current as StateMap, isReady }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default Provider;
