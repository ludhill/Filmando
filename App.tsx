import { NavigationContainer } from '@react-navigation/native';import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/IFilme';

const Stack = createNativeStackNavigator<RootStackParamList>();


import TelaInicial from './pages/TelaInicial';
import DetalhesFilme from './pages/DetalhesFilme';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Buscar Filme' }} />
        <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
