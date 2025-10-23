import { Carro } from '../types/ICarro';

const BASE_URL = 'http://18.231.156.122:8080';

export const getCarros = async (): Promise<Carro[]> => {
  const resposta = await fetch(`${BASE_URL}/listarCarros`);
  if (!resposta.ok) throw new Error('Erro ao buscar carros');
  return await resposta.json();
};

export const saveCarro = async (modelo: string, preco: number) => {
  const resposta = await fetch('http://18.231.156.122:8080/saveCarro', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: `${modelo},${preco}`,
  });

  if (!resposta.ok) {
    throw new Error('Erro ao salvar carro');
  }

  return await resposta.text(); 
};


export const deleteCarro = async (modelo: string): Promise<void> => {
  const resposta = await fetch('http://18.231.156.122:8080/deleteCarro', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: modelo,
  });

  if (!resposta.ok) {
    const erro = await resposta.text();
    throw new Error(`Erro ao deletar carro: ${erro}`);
  }
};
