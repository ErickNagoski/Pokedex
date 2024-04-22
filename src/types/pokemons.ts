interface Type {
  type: { name: string };
}

interface Sprite {
  sprite: string;
}

export interface Pokemon {
  name: string;
  id: number;
  height: number;
  types: Type[];
  sprites: Sprite[];
}

export interface QueryPokemonsResult {
  pokemons: Pokemon[];
}

interface Generation {
  name: string;
}

interface GrowthRate {
  name: string;
}

interface Color {
  name: string;
}

interface Habitat {
  name: string;
}

interface Specy {
  is_legendary: boolean;
  is_baby: boolean;
  is_mythical: boolean;
  capture_rate: number;
  generation: Generation;
  growthrate: GrowthRate;
  color: Color;
  habitat: Habitat;
}

interface Form {
  form_name: string;
}

export interface PokemonProps {
  name: string;
  id: number;
  forms: Form[];
  items: any[]; // Tipo dos items não fornecido na estrutura de dados
  specy: Specy;
  sprites: Sprite[];
  types: Type[];
}


export interface TimePokemonProps {
  name: string;
  pokemon_id: number;
  sprite: string;
  url: string
}