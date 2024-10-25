import { Alert, SafeAreaView, Text, TextInput } from "react-native"
import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from "react"
import axios from "axios"

interface Filial {
    id: string
    name: string
    location: string
    latitude: number
    longitude: number
}

export default function CadastroMovimentacao() {

    const [filialOrigem, setFilialOrigem] = useState('')
    const [filialDestino, setFilialDestino] = useState('')
    const [produtoSelecionado, setProdutoSelecionado] = useState('')
    const [quantidade, setQuantidade] = useState('')

    const [filialOptions, setFilialOptions] = useState<Filial[]>([])
    const [produtosOptions, setProdutosOptions] = useState([])
    const [produtosFiltradosOptions, setProdutosFiltradosOptions] = useState([])

    function handleSelectFilialOrigem(value: string) {
        setFilialOrigem(value)
    }

    function handleSelectFilialDestino(value: string) {
        setFilialDestino(value)
    }

    useEffect(() => {

        axios.get(process.env.EXPO_PUBLIC_API_URL + '/branches/options')
            .then((response) => {
                setFilialOptions(response.data)
            })
            .catch(() => console.log("DEU RUIM"))

        axios.get(process.env.EXPO_PUBLIC_API_URL + '/products/options')
            .then((response) => {
                setProdutosOptions(response.data)
            })
            .catch(() => console.log("DEU RUIM"))

    }, [])


    useEffect(() => {
        if(quantidade && produtoSelecionado) {
     
            const produtoEncontrado = produtosOptions.find(item => String(item.product_id) === String(produtoSelecionado))
            console.log(produtoEncontrado)
            
            if(Number(quantidade) > produtoEncontrado.quantity) {
                console.log("EXCEDEU")
                Alert.alert("Aviso", "Quantidade excede o disponivel")
                setQuantidade('')
            }
        }
    }, [quantidade, produtoSelecionado])

    useEffect(() => {
        if(filialOrigem) {
           const produtosFiltrados =  produtosOptions.filter(produto => produto.branch_id === filialOrigem)
           setProdutosFiltradosOptions(produtosFiltrados)
        }
    }, [filialOrigem])

    return (
        <SafeAreaView>

            <Text>
                {filialDestino === filialOrigem ? 'As filiais estao iguais' : 'as filiais sao diferentes'}

            </Text>

            <Text>Filial origem</Text>
            <Picker
                selectedValue={filialOrigem}
                onValueChange={handleSelectFilialOrigem}
                style={{ backgroundColor: '#FFF', margin: 10 }}
            >
                <Picker.Item value="" label="" />
                {
                    filialOptions.map(filial => <Picker.Item key={filial.id} value={filial.id} label={filial.name} />)
                }
            </Picker>

            <Text>Filial destino</Text>
            <Picker
                selectedValue={filialDestino}
                onValueChange={handleSelectFilialDestino}
                style={{ backgroundColor: '#FFF', margin: 10 }}
            >
                 <Picker.Item value="" label="" />
                {
                    filialOptions.map(filial => <Picker.Item  key={filial.id} value={filial.id} label={filial.name} />)
                }
            </Picker>

            <Text>Produto</Text>
            <Picker
                selectedValue={produtoSelecionado}
                onValueChange={(value) => setProdutoSelecionado(value)}
                style={{ backgroundColor: '#FFF', margin: 10 }}
            >
                 <Picker.Item value="" label="" />
                {
                    produtosFiltradosOptions.map(
                        produto =>
                            <Picker.Item  key={produto.product_id} value={produto.product_id} label={`${produto.product_name} - ${produto.quantity} unid`}
                            />)
                }
            </Picker>

            <Text>quantidade</Text>
            <TextInput
                value={quantidade}
                onChangeText={setQuantidade}
                style={{ borderWidth: 1, borderColor: '#CCC' }}
                keyboardType="number-pad"
            />

        </SafeAreaView>
    )
}