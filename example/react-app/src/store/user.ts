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
        onUpdate: () => {
            console.log('User Updated');
        },
    }
);

export const firstName = gram(user.defaultValue.firstName, 'string', 'stateful', undefined, undefined, {
    onUpdate: (prev, get, set) => {
        // @ts-ignore
        const user: any = get((storeKeys) => storeKeys.user.key);
        set({ ...user, firstName: prev }, 'user');
    },
});

export const lastName = gram(user.defaultValue.lastName, 'string', 'stateful', undefined, undefined, {
    onUpdate: (prev, get, set) => {
        const user: any = get('user');
        set({ ...user, lastName: prev }, 'user');
    },
});

export const email = gram(user.defaultValue.email, 'string', 'stateful', undefined, undefined, {
    onUpdate: (prev, get, set) => {
        const user: any = get('user');
        set({ ...user, email: prev }, 'user');
    },
});
