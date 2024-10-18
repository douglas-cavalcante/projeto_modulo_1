import { Button, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from "@react-navigation/native";


export function Home({ navigation }) {

    function handleLogout() {
        AsyncStorage.removeItem("@name")
        AsyncStorage.removeItem("@profile")
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
    }

    function redirectToUsers(){
        navigation.navigate("ListaUsuarios")
    }

    return (
        <>
            <Button title="Deslogar" onPress={handleLogout} />
            <Text>Eu sou a home</Text>
            <Button title="Ir para usuarios" onPress={redirectToUsers} />
        </>
    )
}