
export type FilmeResumo = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type Filmes = {
  Title: string;
  // ... todos os campos detalhados
};

export type Avaliacao = {
  Source?: string;
  Value?: string;
};

export type Filme = {
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
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
};

export type RootStackParamList = {
  TelaInicial: undefined;
  DetalhesFilme: { imdbID: string };
};
