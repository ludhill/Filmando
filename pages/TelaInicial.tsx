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

type FilmeResumo = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function TelaInicial() {
  const navigation = useNavigation<PropsNav>();
  const [termo, setTermo] = useState('Batman');
  const [filmes, setFilmes] = useState<FilmeResumo[]>([]);
  const [carregando, setCarregando] = useState(false);


  useEffect(() => {
    const delay = setTimeout(() => {
      if (termo.trim()) {
        buscarFilmes(termo);
      } else {
        setFilmes([]);
      }
    }, 500); // 500ms de atraso

    return () => clearTimeout(delay);
  }, [termo]);

  const buscarFilmes = async (titulo: string) => {
    try {
      setCarregando(true);
      const resposta = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(titulo)}&apikey=3736d36e`
      );
      const dados = await resposta.json();
      if (dados.Response === 'True') {
        setFilmes(dados.Search);
      } else {
        setFilmes([]);
      }
    } catch (erro) {
      console.error('Erro ao buscar filmes:', erro);
      setFilmes([]);
    } finally {
      setCarregando(false);
    }
  };


  const renderItem = ({ item }: { item: FilmeResumo }) => (
    <TouchableOpacity
      style={estilos.cartao}
      onPress={() => navigation.navigate('DetalhesFilme', { titulo: item.Title })}
    >
      <Image source={{ uri: item.Poster }} style={estilos.imagemPoster} />
      <Text style={estilos.titulo}>{item.Title}</Text>
      <Text style={estilos.subtitulo}>{item.Year} • {item.Type}</Text>

    </TouchableOpacity>
  );

  return (
  <View style={estilos.container}>
    <Text style={estilos.labelBusca}>🔍 Buscar filme</Text>
    <TextInput
      style={estilos.entradaTexto}
      placeholder="Digite o nome do filme..."
      value={termo}
      onChangeText={setTermo}
    />

    {carregando && (
      <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
    )}

    {!carregando && filmes.length === 0 && (
      <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
        Nenhum filme encontrado.
      </Text>
    )}

    <FlatList
      data={filmes}
      keyExtractor={(item) => item.imdbID}
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
