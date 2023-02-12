import { gram } from 'grams';

const actions = {
    login: () => true,
    logout: () => false,
};
const effects = {
    onMount: () => {
        console.log('Authenticated');
        return false;
    }
};
const middlewares = {
    m1: () => {
        console.log('auth middleware');
        return true;
    }
};

export const isAuthenticated = gram(false, 'boolean', 'stateful', undefined, actions, effects, middlewares);
