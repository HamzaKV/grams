import { gram } from 'grams';

const actions = {
    login: () => {
        // eslint-disable-next-line no-console
        console.log('login');
        return true;
    },
    logout: () => false,
};
const effects = {
    onMount: () => {
        // eslint-disable-next-line no-console
        console.log('Authenticated');
        return false;
    }
};
const middlewares = {
    m1: () => {
        // eslint-disable-next-line no-console
        console.log('auth middleware');
        return true;
    }
};

export const isAuthenticated = gram(false, 'boolean', 'stateful', undefined, actions, effects, middlewares);
