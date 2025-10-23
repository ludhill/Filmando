import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { saveCarro } from '../src/services/carros';
import { estilos } from '../static/style';

export default function InputCarro() {
  const [modelo, setModelo] = useState('');
  const [preco, setPreco] = useState('');

  const handleSalvar = async () => {
    try {
      await saveCarro({ modelo, preco: Number(preco) });
      Alert.alert('Sucesso', 'Carro cadastrado!');
      setModelo('');
      setPreco('');
    } catch {
      Alert.alert('Erro', 'Falha ao cadastrar carro.');
    }
  };

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.entradaTexto}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={estilos.entradaTexto}
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <Button title="Salvar Carro" onPress={handleSalvar} />
    </View>
  );
}
