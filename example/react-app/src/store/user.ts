import { gram } from 'grams';

export const user = gram(
    {
        firstName: 'Hamza',
        lastName: '',
        email: '',
    },
    'object',
    'stateful',
    undefined,
    undefined,
    {
        onUpdate: (prev, get, set) => {
            console.log('user onUpdate');
            const firstName = prev.firstName;
            const lastName = prev.lastName;
            const email = prev.email;
            set(firstName, 'firstName');
            set(lastName, 'lastName');
            set(email, 'email');
        },
    }
);

export type User = typeof user.defaultValue;

export const firstName = gram(user.defaultValue.firstName, 'string', 'stateful', undefined, undefined, {
    onUpdate: (prev, get, set) => {
        const user = get((storeKeys) => storeKeys.user.key) as User;
        set({ ...user, firstName: prev }, 'user');
    },
});

export const lastName = gram(user.defaultValue.lastName, 'string', 'stateful', undefined, undefined, {
    onUpdate: (prev, get, set) => {
        const user = get('user') as User;
        set({ ...user, lastName: prev }, 'user');
    },
});

export const email = gram(user.defaultValue.email, 'string', 'stateful', undefined, undefined, {
    onUpdate: (prev, get, set) => {
        const user = get('user') as User;
        set({ ...user, email: prev }, 'user');
    },
});
