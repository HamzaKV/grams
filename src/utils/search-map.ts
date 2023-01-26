import { propDenote } from '../constants/strings';
import { StateMap } from '../models/state-map';
import { GramNode } from '../types/gram';
import { splitKey } from './state-prop';

export const getAllRelations = 
(map: StateMap): (accKey: string) => GramNode<unknown>[] => 
    (accKey: string): GramNode<unknown>[] => {
        const childrenAndSelf = map
            .entries()
            .filter(([key]) => 
                accKey.includes(propDenote) 
                    ? key.includes(accKey) : key === accKey
            )
            .map(([, value]) => value);

        const keys = splitKey(accKey).slice(0, -1);

        let recAccKey = '';

        const parents = keys.reduce(
            (acc: GramNode<unknown>[], curr: string) => {
                recAccKey += curr + propDenote;
                const parent = map.get(recAccKey);

                if (parent) {
                    acc.push(parent);
                }

                return acc;
            }, 
            []
        );

        return [...parents, ...childrenAndSelf];
    };
