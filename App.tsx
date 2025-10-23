import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './pages/TelaInicial';
import DetalhesCarro from './pages/DetalhesCarro';
import { RootStackParamList } from './src/types/Navegacao';
import InputCarro from './pages/InputCarro';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="InputCarro" component={InputCarro} />
        <Stack.Screen name="DetalhesCarro" component={DetalhesCarro} />
        {/* <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}