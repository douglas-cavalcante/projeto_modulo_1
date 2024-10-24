import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

    const [email, setEmail] = useState('')


   async function redirectToHome(){
        const nomeLocalStorage =  await AsyncStorage.getItem("@name")

        if(nomeLocalStorage) {
            navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                })
              ); 
        }
    }

    useEffect(() => {
        // consulta o local storage  
        
        redirectToHome()
       
    }, [])

   

    function handleLogin() {

        console.log("entrei na login ")

        axios.post(process.env.EXPO_PUBLIC_API_URL + '/login', {
            email: 'admin@gmail.com',
            password: '123456'
        })
        .then((response) => {
           
            AsyncStorage.setItem("@name", 'Douglinhas')

            if(response.data.profile === "admin") {
                // navegue tela HOME

                navigation.navigate("Home")

                /*
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Home' }],
                    })
                  );
                  */

            } else if(response.data.profile === 'filial') {
                // navegue tela movimentao
            } else {
                // naegue tela movimentacao dos motorista
            }
        })
        .catch(() => {
            console.log("caiu no catch")
            // Alert.alert("")
        })
    }

    return (
        <Button title="logar"  onPress={handleLogin} />
    )
}