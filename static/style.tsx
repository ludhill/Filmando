import { StyleSheet, Dimensions } from 'react-native';

const largura = Dimensions.get('window').width;
const margem = 16;
const colunas = 2;
const larguraCartao = (largura - margem * (colunas + 1)) / colunas;

export const estilos = StyleSheet.create({
  labelBusca: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    alignSelf: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 80,
  },
  entradaTexto: {
    borderWidth: 1,
    borderColor: '#ccf',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '90%',
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: 'center',
  },
  cartao: {
    width: larguraCartao,
    margin: margem / 2,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  imagemPoster: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    textAlign: 'center',
  },
  diretor: {
    fontSize: 14,
    color: '#444',
  },
  roteirista: {
    fontSize: 14,
    color: '#440',
  },
  elenco: {
    fontSize: 14,
    color: '#444',
  },
  sinopse: {
    fontSize: 14,
    marginTop: 12,
    color: '#222',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  premios: {
    fontSize: 13,
    color: '#007BFF',
    marginTop: 6,
    textAlign: 'center',
  },
  detalhesAdicionais: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  avaliacoes: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
