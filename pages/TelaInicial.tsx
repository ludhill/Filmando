import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { estilos } from '../static/style';
import { FilmeResumo, Filmes } from '../src/IFilme';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/IFilme';

type PropsNav = NativeStackNavigationProp<RootStackParamList, 'TelaInicial'>;
const navigation = useNavigation<PropsNav>();


export default function TelaInicial() {
  const [titulo, setTitulo] = useState('Superman');
  const [filmes, setFilmes] = useState<FilmeResumo[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    buscarFilmes();
  }, [titulo]);

  const buscarFilmes = async () => {
    const resposta = await fetch(`https://www.omdbapi.com/?s=${titulo}&apikey=3736d36e`);
    const dados = await resposta.json();
    if (dados.Response === 'True') {
      setFilmes(dados.Search);
    } else {
      setFilmes([]);
    }
  };

  const renderItem = ({ item }: { item: FilmeResumo }) => (
    <TouchableOpacity
      style={estilos.cartao}
      onPress={() => navigation.navigate('DetalhesFilme', { imdbID: item.imdbID })}
    >
      <Image source={{ uri: item.Poster }} style={estilos.imagemPoster} />
      <Text style={estilos.titulo}>{item.Title}</Text>
      <Text style={estilos.subtitulo}>📅 {item.Year} • 🎬 {item.Type}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.entradaTexto}
        placeholder="Pesquisar filme..."
        value={titulo}
        onChangeText={setTitulo}
      />

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.imdbID}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
}
