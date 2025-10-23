import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/Navegacao';
import { estilos } from '../static/style';
import { getCarros, saveCarro } from '../src/services/carros';
import { Carro } from '../src/types/ICarro';

type PropsNav = NativeStackNavigationProp<RootStackParamList, 'TelaInicial'>;

export default function TelaInicial() {
  const navigation = useNavigation<PropsNav>();
  const [carros, setCarros] = useState<Carro[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [modelo, setModelo] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    buscarCarros();
  }, []);

  const buscarCarros = async () => {
    try {
      setCarregando(true);
      const dados = await getCarros();
      setCarros(dados);
    } catch (erro) {
      console.error('Erro ao buscar carros:', erro);
      setCarros([]);
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvar = async () => {
    try {
      if (!modelo || !preco) {
        Alert.alert('Atenção', 'Preencha todos os campos.');
        return;
      }

      if (!modelo || isNaN(Number(preco))) {
        Alert.alert('Erro', 'Preencha os campos corretamente.');
        return;
      }
      
      await saveCarro(modelo, Number(preco));
      Alert.alert('Sucesso', 'Carro cadastrado!');
      setModelo('');
      setPreco('');
      buscarCarros(); // atualiza a lista
    } catch {
      Alert.alert('Erro', 'Falha ao cadastrar carro.');
    }
  };

  const renderItem = ({ item }: { item: Carro }) => (
    <TouchableOpacity
      style={estilos.cartao}
      onPress={() => navigation.navigate('DetalhesCarro', { id: item.id })}
    >
      <Text style={estilos.titulo}>{item.modelo}</Text>
      <Text style={estilos.subtitulo}>Preço: R$ {item.preco.toLocaleString('pt-BR')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={estilos.container}>
      <Text style={estilos.labelBusca}>🚗 Tela Inicial</Text>

      {/* Formulário de cadastro */}
      <View style={{ marginVertical: 20 }}>
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
        <TouchableOpacity
          style={{
            backgroundColor: '#007BFF',
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={handleSalvar}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Salvar Carro</Text>
        </TouchableOpacity>
      </View>

      {carregando && (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      )}

      {!carregando && carros.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
          Nenhum carro encontrado.
        </Text>
      )}

      <FlatList
        data={carros}
        keyExtractor={(item) => item.id?.toString() || ''}
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


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../src/types/Navegacao';
// import { estilos } from '../static/style';

// type PropsNav = NativeStackNavigationProp<RootStackParamList, 'TelaInicial'>;
// type CarroResumo = {
//   id: number;
//   modelo: string;
//   preco: number;
// };

// export default function TelaInicial() {
//   const navigation = useNavigation<PropsNav>();
//   const [termo, setTermo] = useState('');
//   const [carros, setCarros] = useState<CarroResumo[]>([]);
//   const [carregando, setCarregando] = useState(false);

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       buscarCarros();
//     }, 500);

//     return () => clearTimeout(delay);
//   }, []);

//   const buscarCarros = async () => {
//     try {
//       setCarregando(true);
//       const resposta = await fetch('http://18.231.156.122:8080/listarCarros');
//       const dados = await resposta.json();
//       setCarros(dados);
//     } catch (erro) {
//       console.error('Erro ao buscar carros:', erro);
//       setCarros([]);
//     } finally {
//       setCarregando(false);
//     }
//   };

//   const renderItem = ({ item }: { item: CarroResumo }) => (
//     <TouchableOpacity
//       style={estilos.cartao}
//       onPress={() => navigation.navigate('DetalhesFilme', { titulo: item.modelo })}
//     >
//       <Text style={estilos.titulo}>{item.modelo}</Text>
//       <Text style={estilos.subtitulo}>Preço: R$ {item.preco.toLocaleString('pt-BR')}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={estilos.container}>
//       <Text style={estilos.labelBusca}>🚗 Lista de Carros</Text>

//       {carregando && (
//         <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
//       )}

//       {!carregando && carros.length === 0 && (
//         <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
//           Nenhum carro encontrado.
//         </Text>
//       )}

//       <FlatList
//         data={carros}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         numColumns={2}
//         contentContainerStyle={{
//           paddingHorizontal: 8,
//           paddingBottom: 60,
//           justifyContent: 'center',
//         }}
//       />
//     </View>
//   );
// }

// type FilmeResumo = {
//   Title: string;
//   Year: string;
//   imdbID: string;
//   Type: string;
//   Poster: string;
// };

// export default function TelaInicial() {
//   const navigation = useNavigation<PropsNav>();
//   const [termo, setTermo] = useState('Batman');
//   const [filmes, setFilmes] = useState<FilmeResumo[]>([]);
//   const [carregando, setCarregando] = useState(false);


//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (termo.trim()) {
//         buscarFilmes(termo);
//       } else {
//         setFilmes([]);
//       }
//     }, 500); // 500ms de atraso

//     return () => clearTimeout(delay);
//   }, [termo]);

//   const buscarFilmes = async (titulo: string) => {
//     try {
//       setCarregando(true);
//       const resposta = await fetch(
//         `http://18.231.156.122:8080/listarCarros`
//       );
//       const dados = await resposta.json();
//       if (dados.Response === 'True') {
//         setFilmes(dados.Search);
//       } else {
//         setFilmes([]);
//       }
//     } catch (erro) {
//       console.error('Erro ao buscar filmes:', erro);
//       setFilmes([]);
//     } finally {
//       setCarregando(false);
//     }
//   };


//   const renderItem = ({ item }: { item: FilmeResumo }) => (
//     <TouchableOpacity
//       style={estilos.cartao}
//       onPress={() => navigation.navigate('DetalhesFilme', { titulo: item.Title })}
//     >
//       <Image source={{ uri: item.Poster }} style={estilos.imagemPoster} />
//       <Text style={estilos.titulo}>{item.Title}</Text>
//       <Text style={estilos.subtitulo}>{item.Year} • {item.Type}</Text>

//     </TouchableOpacity>
//   );

//   return (
//   <View style={estilos.container}>
//     <Text style={estilos.labelBusca}>🔍 Buscar filme</Text>
//     <TextInput
//       style={estilos.entradaTexto}
//       placeholder="Digite o nome do filme..."
//       value={termo}
//       onChangeText={setTermo}
//     />

//     {carregando && (
//       <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
//     )}

//     {!carregando && filmes.length === 0 && (
//       <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
//         Nenhum filme encontrado.
//       </Text>
//     )}

//     <FlatList
//       data={filmes}
//       keyExtractor={(item) => item.imdbID}
//       renderItem={renderItem}
//       numColumns={2}
//       contentContainerStyle={{
//         paddingHorizontal: 8,
//         paddingBottom: 60,
//         justifyContent: 'center',
//       }}
//     />
//   </View>
// );

// }
