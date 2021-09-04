import { useRef, FC } from 'react';
import AppContext from './context';
import createStore from '../utils/create-store';
import { Gram } from '../types/gram';

interface IProps {
    models: {
        [key: string]: Gram<any>;
    };
    allowGlobal?: boolean;
}

const Provider: FC<IProps> = ({ models, children, allowGlobal }) => {
    const { store, map } = createStore(models, allowGlobal);
    const storeRef = useRef(store);
    const mapRef = useRef(map);

    return (
        <AppContext.Provider
            value={{ store: storeRef.current, map: mapRef.current }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default Provider;
