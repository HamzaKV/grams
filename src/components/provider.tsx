import { useRef, FC } from 'react';
import AppContext from './context';
import createStore from '../utils/create-store';
import type { GramModels } from '../types/gram';

interface IProps {
    models: GramModels;
}

const Provider: FC<IProps> = ({ models, children }) => {
    const { stateMap } = createStore(models);
    // using a ref to ensure the entire component is not re-rendered when any part of the state changes. 
    // Component(s) should only be re-rendered when signaled to.
    const mapRef = useRef(stateMap);

    return (
        <AppContext.Provider
            value={{ map: mapRef.current }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default Provider;
