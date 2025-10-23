import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../src/types/Navegacao';
import { deleteCarro, getCarros } from '../src/services/carros';
import { estilos } from '../static/style';

type DetalhesCarroRouteProp = RouteProp<RootStackParamList, 'DetalhesCarro'>;

export default function DetalhesCarro() {
  const route = useRoute<DetalhesCarroRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;
  const [carro, setCarro] = useState<any>(null);

  useEffect(() => {
    const buscarCarro = async () => {
      const todos = await getCarros();
      const encontrado = todos.find((c) => c.id === id);
      setCarro(encontrado);
    };
    buscarCarro();
  }, [id]);

  const handleDelete = async () => {
    try {
      Alert.alert(
        'Confirmar',
        `Deseja deletar o modelo "${carro.modelo}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Deletar', style: 'destructive', onPress: () => handleDelete() },
        ]
      );
      
      await deleteCarro(carro.modelo);
      Alert.alert('Sucesso', 'Carro deletado com sucesso!');
      navigation.goBack();
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível deletar o carro.');
    }
  };

  if (!carro) {
    return <Text style={estilos.labelBusca}>Carregando...</Text>;
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{carro.modelo}</Text>
      <Text style={estilos.subtitulo}>Preço: R$ {carro.preco}</Text>

      <Button title="🗑️ Deletar Carro" color="red" onPress={handleDelete} />
    </View>
  );
}
