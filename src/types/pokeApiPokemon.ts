export interface PokeApiPokemon {
    abilities: AbilityInfo[];
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    };
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: any[]; // Pode ser uma interface específica se houver informações detalhadas sobre os itens realizados
    id: number;
    name: string;
    is_default: boolean;
    location_area_encounters: string;
    moves: MoveInfo[];
    sprites: PokemonSprites,
    types: PokemonTypes[]
}

interface AbilityInfo {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

interface Form {
    name: string;
    url: string;
}

interface GameIndex {
    game_index: number;
    version: {
        name: string;
        url: string;
    };
}

interface MoveInfo {
    move: {
        name: string;
        url: string;
    };
    version_group_details: MoveVersionGroupDetail[];
}

interface MoveVersionGroupDetail {
    level_learned_at: number;
    move_learn_method: {
        name: string;
        url: string;
    };
    version_group: {
        name: string;
        url: string;
    };
}

interface PokemonSprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
}

interface PokemonTypes {
    slot: number,
    type: {
        name: string,
        url: string
    }
}
