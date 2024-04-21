import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios"

interface PokemonTypes { types: { id: number; name: string }[] }

const fetchData = async () => {
    const response = await api.get<PokemonTypes>('/types');
    return response.data
}

export function useTypesData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['pokemonTypes']
    })

    return { pokemonTypes: query.data?.types || [] }
}