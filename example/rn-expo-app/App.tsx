import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {
    useStoreActions,
    useStoreProduce,
    useStoreValue,
    Provider,
} from 'grams';
import models from './store';

const App = () => {
    const isAuthenticated = useStoreValue(
        (storeKeys) => storeKeys.isAuthenticated.key
    );

    return (
        <View style={styles.container}>
            {isAuthenticated ? <AuthScreen /> : <LoginButton />}
            <StatusBar style='auto' />
        </View>
    );
};

const AuthScreen = () => {
    const list = useStoreValue('list');
    const removeItem = useStoreActions('remove', 'list');

    return (
        <>
            <LogoutButton />
            {(list as any).map((item: any, index: number) => (
                <View key={index}>
                    <Text>{item}</Text>
                    <Pressable
                        onPress={() => {
                            removeItem(index);
                        }}
                    >
                        <Text>Remove</Text>
                    </Pressable>
                </View>
            ))}
            <AddItem />
        </>
    );
};

const AddItem = () => {
    const addItem = useStoreActions('add', 'list');
    const length = useStoreProduce('length', 'list');

    return (
        <Pressable
            onPress={() => {
                addItem(`New Item ${length}`);
            }}
        >
            <Text>Add Item</Text>
        </Pressable>
    );
};

const LoginButton = () => {
    const login = useStoreActions(
        (storeKeys) => storeKeys.isAuthenticated.actionKeys.login,
        (storeKeys) => storeKeys.isAuthenticated.key
    );

    return (
        <Pressable
            onPress={() => {
                login();
            }}
        >
            <Text>Login</Text>
        </Pressable>
    );
};

const LogoutButton = () => {
    const logout = useStoreActions(
        (storeKeys) => storeKeys.isAuthenticated.actionKeys.logout,
        (storeKeys) => storeKeys.isAuthenticated.key
    );

    return (
        <Pressable
            onPress={() => {
                logout();
            }}
        >
            <Text>Logout</Text>
        </Pressable>
    );
};

const Root = () => {
    return (
        <Provider
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            models={models}
        >
            <App />
        </Provider>
    );
};

export default Root;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
