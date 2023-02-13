import { gram } from 'grams';
import AsyncStorage from '@react-native-async-storage/async-storage';

const produce = {
    length: (value: any) => value.length
};

const actions = {
    add: (prev: any[], newValue: any) => {
        return [...prev, newValue];
    },
    remove: (prev: any[], index: number) => {
        return prev.filter((_, i) => i !== index);
    }
};
const effects = {
    onMount: async () => {
        const list = await AsyncStorage.getItem('list');
        return list ? JSON.parse(list) : [];
    },
    onUpdate: (prev: string[]) => {
        AsyncStorage.setItem('list', JSON.stringify(prev));
    }
};
const middlewares = {
    m1: () => {
        return true;
    }
};

export const list = gram([], 'object', 'stateful', produce, actions, effects, middlewares);
