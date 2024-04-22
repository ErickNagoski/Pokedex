import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios"
import { PokeApiTypes } from "../types/pokeApi";

const fetchData = async () => {
    const response = await api.get<PokeApiTypes>('https://pokeapi.co/api/v2/type/');
    return response.data
}

export function useTypesData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['pokemonTypes']
    })

    return { pokemonTypes: query.data?.results || [] }
}