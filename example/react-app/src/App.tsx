import { useStoreActions, useStoreProduce, useStoreValue, useStore } from 'grams';
import type { User } from './store/user';

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
            <FirstName />
            <UpdateUser />
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

const FirstName = () => {
    const [firstName, setFirstName] = useStore((storeKeys) => storeKeys.firstName.key);

    return (
        <div>
            <label>Updating First Name in User</label>
            <input
                value={firstName as string}
                onChange={(e) => {
                    // @ts-ignore
                    setFirstName(e.target.value);
                }}
            />
        </div>
    );
};

const UpdateUser = () => {
    const [user, setUser] = useStore((storeKeys) => storeKeys.user.key);

    return (
        <div>
            <label>Updating User</label>
            <input
                value={(user as User).firstName as string}
                onChange={(e) => {
                    // @ts-ignore
                    setUser({
                        ...(user as User),
                        firstName: e.target.value,
                    });
                }}
            />
        </div>
    );
};

export default App;
