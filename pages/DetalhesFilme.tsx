import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../src/types/Navegacao';
import { estilos } from '../static/style';

type DetalhesRouteProp = RouteProp<RootStackParamList, 'DetalhesFilme'>;

type Avaliacao = {
  Source?: string;
  Value?: string;
};

type Filme = {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Avaliacao[];
  Metascore?: string;
  imdbRating?: string;
  BoxOffice?: string;
  Type?: string;
};

export default function DetalhesFilme() {
  const route = useRoute<DetalhesRouteProp>();
  const { titulo } = route.params;

  const [filme, setFilme] = useState<Filme | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const resposta = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=3736d36e`);
        const dados = await resposta.json();
        if (dados.Response === 'True') {
          setFilme(dados);
        }
      } catch (erro) {
        console.error('Erro ao buscar detalhes:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarDetalhes();
  }, [titulo]);

  if (carregando) {
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!filme) {
    return <Text style={estilos.titulo}>Filme não encontrado.</Text>;
  }

  const rotten = filme.Ratings?.find(r => r.Source === 'Rotten Tomatoes')?.Value ?? 'N/A';
  const metacritic = filme.Ratings?.find(r => r.Source === 'Metacritic')?.Value ?? 'N/A';

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.cartao}>
        <Image source={{ uri: filme.Poster }} style={estilos.imagemPoster} resizeMode="cover" />
        <Text style={estilos.titulo}>{filme.Title} ({filme.Year})</Text>
        <Text style={estilos.subtitulo}>{filme.imdbRating} — {filme.Genre}</Text>
        <Text style={estilos.diretor}>Diretor: {filme.Director}</Text>
        <Text style={estilos.roteirista}>Roteirista: {filme.Writer}</Text>
        <Text style={estilos.elenco}>Elenco: {filme.Actors}</Text>
        <Text style={estilos.sinopse}>{filme.Plot}</Text>
        <Text style={estilos.premios}>{filme.Awards}</Text>
        <Text style={estilos.detalhesAdicionais}>
          Lançamento: {filme.Released} | Duração: {filme.Runtime}
        </Text>
        <Text style={estilos.detalhesAdicionais}>
          País: {filme.Country} | Classificação: {filme.Rated}
        </Text>
        <Text style={estilos.detalhesAdicionais}>
          Bilheteria: {filme.BoxOffice}
        </Text>
        <Text style={estilos.avaliacoes}>
          Rotten Tomatoes: {rotten} | Metacritic: {metacritic}
        </Text>
      </View>
    </ScrollView>
  );
}
