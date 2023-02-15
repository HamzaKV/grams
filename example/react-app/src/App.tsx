import { useStoreActions, useStoreProduce, useStoreValue } from 'grams';

const App = () => {
    const isAuthenticated = useStoreValue(
        (storeKeys) => storeKeys.isAuthenticated.key
    );
    return <div>{isAuthenticated ? <AuthScreen /> : <LoginButton />}</div>;
};

const AuthScreen = () => {
    const list = useStoreValue('list');
    const removeItem = useStoreActions('remove', 'list');
    return (
        <div>
            <LogoutButton />
            <ul>
                {(list as any).map((item: any, index: number) => (
                    <li key={index}>
                        {item}
                        <button
                            onClick={() => {
                                removeItem(index);
                            }}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <AddItem />
        </div>
    );
};

const AddItem = () => {
    const addItem = useStoreActions('add', 'list');
    const length = useStoreProduce('length', 'list');

    return (
        <button
            onClick={() => {
                addItem(`New Item ${length}`);
            }}
        >
            Add Item
        </button>
    );
};

const LoginButton = () => {
    const login = useStoreActions(
        (storeKeys) => storeKeys.isAuthenticated.actionKeys.login,
        (storeKeys) => storeKeys.isAuthenticated.key
    );

    return (
        <button
            onClick={() => {
                login();
            }}
        >
            Login
        </button>
    );
};

const LogoutButton = () => {
    const logout = useStoreActions(
        (storeKeys) => storeKeys.isAuthenticated.actionKeys.logout,
        (storeKeys) => storeKeys.isAuthenticated.key
    );

    return (
        <button
            onClick={() => {
                logout();
            }}
        >
            Logout
        </button>
    );
};

export default App;
