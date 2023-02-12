import { gram } from 'grams';

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
    onMount: () => {
        const list = localStorage.getItem('list');
        return !!list ? JSON.parse(list) : [];
    },
    onUpdate: (prev: string[]) => {
        localStorage.setItem('list', JSON.stringify(prev));
    }
};
const middlewares = {
    m1: () => {
        return true;
    }
};

export const list = gram([], 'object', 'stateful', produce, actions, effects, middlewares);
