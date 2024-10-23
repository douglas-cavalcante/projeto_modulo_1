import {  Text, FlatList, View, Button } from "react-native";
import {useEffect, useState} from 'react'
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

export function ListaUsuarios({navigation}) {

    const [ users, setUsers] = useState([])

    useFocusEffect(() => {
        axios.get('http://192.168.0.37:3000/users')
        .then((response) => {
            setUsers(response.data)
        })
        .catch(() => {
            console.log("deu ruim")
        }) 
    })

    function redirectToNewUser(){
        navigation.navigate("NovoUsuario")
    }

    return (
        <>
            <Button title="Novo usuario" onPress={redirectToNewUser} />
           <FlatList 
            data={users}
            renderItem={({item}) => (
                <View>
                    <Text>{item.name}</Text>
                </View>
            )}
           numColumns={2}
           />
        </>
    )
}