import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/Navegacao';
import { estilos } from '../static/style';

type PropsNav = NativeStackNavigationProp<RootStackParamList, 'TelaInicial'>;

type DeputadoResumo = {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
};

export default function TelaDeputados() {
  const navigation = useNavigation<PropsNav>();
  const [termo, setTermo] = useState('João');
  const [deputados, setDeputados] = useState<DeputadoResumo[]>([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (termo.trim()) {
        buscarDeputados(termo);
      } else {
        setDeputados([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [termo]);

  const buscarDeputados = async (nome: string) => {
    try {
      setCarregando(true);
      const resposta = await fetch(
        `https://dadosabertos.camara.leg.br/api/v2/deputados?nome=${encodeURIComponent(nome)}`
      );
      const dados = await resposta.json();
      setDeputados(dados.dados);
    } catch (erro) {
      console.error('Erro ao buscar deputados:', erro);
      setDeputados([]);
    } finally {
      setCarregando(false);
    }
  };

  const renderItem = ({ item }: { item: DeputadoResumo }) => (
    <TouchableOpacity
      style={estilos.cartao}
      onPress={() => navigation.navigate('DetalhesDeputado', { id: item.id })}
    >
      <Image source={{ uri: item.urlFoto }} style={estilos.imagemPoster} />
      <Text style={estilos.titulo}>{item.nome}</Text>
      <Text style={estilos.subtitulo}>{item.siglaPartido} • {item.siglaUf}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.labelBusca}>🔍 Buscar deputado</Text>
      <TextInput
        style={estilos.entradaTexto}
        placeholder="Digite o nome do deputado..."
        value={termo}
        onChangeText={setTermo}
      />

      {carregando && (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      )}

      {!carregando && deputados.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
          Nenhum deputado encontrado.
        </Text>
      )}

      <FlatList
        data={deputados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 60,
          justifyContent: 'center',
        }}
      />
    </View>
  );
}
