import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../src/types/Navegacao';
import { estilos } from '../static/style';

type DeputadoRouteProp = RouteProp<RootStackParamList, 'DetalhesDeputado'>;

type DetalhesDeputado = {
  id: number;
  nomeCivil: string;
  sexo: string;
  dataNascimento: string;
  naturalidade: string;
  escolaridade: string;
  ultimoStatus: {
    siglaPartido: string;
    siglaUf: string;
    gabinete: {
      nome: string;
      predio: string;
      sala: string;
      telefone: string;
      email: string;
    };
    urlFoto: string;
    nome: string;
  };
};

export default function DetalhesDeputado() {
  const route = useRoute<DeputadoRouteProp>();
  const { id } = route.params;

  const [deputado, setDeputado] = useState<DetalhesDeputado | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const resposta = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`);
        const json = await resposta.json();
        setDeputado(json.dados);
      } catch (erro) {
        console.error('Erro ao buscar deputado:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, [id]);

  if (carregando) {
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!deputado) {
    return <Text style={estilos.titulo}>Deputado não encontrado.</Text>;
  }

  const { nomeCivil, sexo, dataNascimento, naturalidade, escolaridade, ultimoStatus } = deputado;
  const gabinete = ultimoStatus.gabinete;

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.cartao}>
        <Image source={{ uri: ultimoStatus.urlFoto }} style={estilos.imagemPoster} resizeMode="cover" />
        <Text style={estilos.titulo}>{ultimoStatus.nome}</Text>
        <Text style={estilos.subtitulo}>{ultimoStatus.siglaPartido} • {ultimoStatus.siglaUf}</Text>

        <Text style={estilos.detalhesAdicionais}>
          Nome civil: {nomeCivil}
        </Text>
        <Text style={estilos.detalhesAdicionais}>
          Sexo: {sexo} • Nascimento: {dataNascimento}
        </Text>
        <Text style={estilos.detalhesAdicionais}>
          Naturalidade: {naturalidade}
        </Text>
        <Text style={estilos.detalhesAdicionais}>
          Escolaridade: {escolaridade}
        </Text>

        <Text style={estilos.detalhesAdicionais}>
          Gabinete: {gabinete.nome} ({gabinete.predio}, sala {gabinete.sala})
        </Text>
        <Text style={estilos.detalhesAdicionais}>
          Telefone: {gabinete.telefone || 'N/A'} • E-mail: {gabinete.email || 'N/A'}
        </Text>
      </View>
    </ScrollView>
  );
}
