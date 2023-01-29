import { useRef, useState } from 'react';
import AppContext from './context';
import createStore from '../utils/create-store';
import type { GramModels } from '../types/gram';
import type { Component } from '../types/component';
import { StateMap } from '../models/state-map';
import useDidMountEffect from '../hooks/use-did-mount-effect';

interface IProps {
    models: GramModels;
}

const Provider: Component<IProps> = ({ models, children }) => {
    const [isReady, setIsReady] = useState(false);
    // using a ref to ensure the entire component is not re-rendered when any part of the state changes.
    // Component(s) should only be re-rendered when signaled to.
    const mapRef = useRef<StateMap | null>();

    useDidMountEffect(() => {
        mapRef.current = createStore(models).stateMap;
        setIsReady(true);
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
