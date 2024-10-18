import {  Text, FlatList, View } from "react-native";
import {useEffect, useState} from 'react'
import axios from "axios";

export function ListaUsuarios() {

    const [ users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://192.168.0.37:3000/users')
        .then((response) => {
            setUsers(response.data)
        })
        .catch(() => {
            console.log("deu ruim")
        })
      
    }, [])

    return (
        <>
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