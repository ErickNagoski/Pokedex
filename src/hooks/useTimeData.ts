import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios"
import { TimePokemonProps } from "../types/pokemons";

interface PokemonTime { time: TimePokemonProps[] }

const fetchData = async () => {
    const response = await api.get<PokemonTime>('/time/');
    return response.data
}

export function useTimeData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['pokemonTypes']
    })

    return { pokemonTime: query.data?.time || [] }
}