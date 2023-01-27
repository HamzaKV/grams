import {
    FC,
    ReactElement,
    ReactNode,
    PropsWithChildren,
} from 'react';

export type ReactComponent = ReactElement | ReactNode;

export type ReactComponentArray = ReactComponent[];

// eslint-disable-next-line @typescript-eslint/ban-types
export type Component<T = {}> = FC<PropsWithChildren<T>>;
