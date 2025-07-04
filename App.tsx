import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from './pages/TelaInicial';
import DetalhesFilme from './pages/DetalhesFilme';
import { RootStackParamList } from './src/types/Navegacao';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}