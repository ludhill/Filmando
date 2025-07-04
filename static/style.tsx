import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  entradaTexto: {
    borderWidth: 1,
    borderColor: '#ccf',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '90%',
    borderRadius: 6,
    marginBottom: 20,
  },
  cartao: {
    width: '90%',
    padding: 16,
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
    width: 220,
    height: 320,
    borderRadius: 8,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
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
  },
  avaliacoes: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: 'bold',
    color: '#000',
  }
});
