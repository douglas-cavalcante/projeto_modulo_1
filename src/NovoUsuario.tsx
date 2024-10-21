import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, TextInput, Button } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from "react";
import axios from "axios";

export default function NovoUsuario() {

    const [profile, setProfile] = useState('motorista')
    const [document, setDocument] = useState('')
    const [email, setEmail] = useState('')

    function changeProfileMotorista(){
        setProfile('motorista')
    }

    function changeProfileFilial(){
        setProfile('filial')
    }

    function saveUser(){
        // validar

        // fazer requisição para cadastrar usuario

        axios.post(process.env.EXPO_PUBLIC_API_URL + '/register', {
            profile: profile,
            name: 'Henrique Douglas',
            document: document,
            full_address: "Rua x, bairro y",
            email: email,
            password: "123456"
        })
         .then(() => {
            console.log("DEU CERTO")
            
         })
         .catch(() => {

         })
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>            

            <View style={styles.containerOptions}>
                <TouchableOpacity style={styles.optionProfile} onPress={changeProfileMotorista}>
                    <MaterialCommunityIcons
                        name="motorbike-electric"
                        size={30}
                        color={profile === "motorista" ? "green" : "#000"}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionProfile} onPress={changeProfileFilial}>
                    <MaterialCommunityIcons
                        name="home"
                        size={30}
                        color={profile === "filial" ? "green" : "#000"}
                    />
                </TouchableOpacity>
            </View>

            <Text>{profile === 'motorista' ? 'CPF' : 'CNPJ'}</Text>
            <TextInput 
                style={styles.input}
                value={document}
                onChangeText={setDocument}
            />

            <Text>Email</Text>
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <Button title="Cadastrar" onPress={saveUser} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionProfile: {
        width: 100,
        height: 50,
        backgroundColor: '#CCC',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        width: '100%',
        height: 32,
        marginVertical: 10,
        padding: 10
    }
})