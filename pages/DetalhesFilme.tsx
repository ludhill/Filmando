import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { estilos } from '../static/style';
import { Filme } from '../src/IFilme';

import { RootStackParamList } from '../src/IFilme';

type DetalhesRouteProp = RouteProp<RootStackParamList, 'DetalhesFilme'>;
const route = useRoute<DetalhesRouteProp>();
const { imdbID } = route.params;


type ParametrosRotas = {
  DetalhesFilme: {
    filme: Filme;
  };
};

export default function DetalhesFilme() {
  const route = useRoute<RouteProp<ParametrosRotas, 'DetalhesFilme'>>();
  const { filme } = route.params;

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.cartao}>
        <Image
          source={{ uri: filme.Poster }}
          style={estilos.imagemPoster}
          resizeMode="cover"
        />
        <Text style={estilos.titulo}>{filme.Title} ({filme.Year})</Text>
        <Text style={estilos.subtitulo}> {filme.imdbRating} — {filme.Genre}</Text>
        <Text style={estilos.diretor}> Diretor: {filme.Director}</Text>
        <Text style={estilos.roteirista}> Roteirista: {filme.Writer}</Text>
        <Text style={estilos.elenco}> Elenco: {filme.Actors}</Text>
        <Text style={estilos.sinopse}>{filme.Plot}</Text>
        <Text style={estilos.premios}> {filme.Awards}</Text>
        <Text style={estilos.detalhesAdicionais}>
           Lançamento: {filme.Released} |  {filme.Runtime}
        </Text>
        <Text style={estilos.detalhesAdicionais}>
           País: {filme.Country} |  Classificação: {filme.Rated}
        </Text>
        <Text style={estilos.detalhesAdicionais}>
           Bilheteria: {filme.BoxOffice}
        </Text>
        <Text style={estilos.avaliacoes}>
           Rotten Tomatoes: {filme.Ratings?.[1]?.Value ?? 'N/A'} |  Metacritic: {filme.Ratings?.[2]?.Value ?? 'N/A'}
        </Text>
      </View>
    </ScrollView>
  );
}
