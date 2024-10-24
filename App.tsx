import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Login from './src/Login';
import { Home } from './src/Home';
import { StatusBar } from 'react-native';
import { ListaUsuarios } from './src/ListaUsuarios';
import NovoUsuario from './src/NovoUsuario';
import CadastroMovimentacao from './src/CadastroMovimentacao';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
       <Stack.Navigator initialRouteName='CadastroMovimentacao'>
           <Stack.Screen name="Login" component={Login} options={{header: () => <></>}} />
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="ListaUsuarios" component={ListaUsuarios} />
           <Stack.Screen name="NovoUsuario" component={NovoUsuario} />
           <Stack.Screen name="CadastroMovimentacao" component={CadastroMovimentacao} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}


