import { useEffect, useMemo, useState } from "react";
import { PokeApiPokemon } from "../types/pokeApiPokemon";
import api from "../utils/axios";
import { Grid, Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import { PokemonModal } from "./PokemonModal";

export default function PokemonCard({ url, inTime }: { url: string, inTime:boolean }) {

    const [pokemon, setPokemon] = useState<PokeApiPokemon>();
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(!openModal)
    }


    async function getPokemon(): Promise<void> {
        const response = await api.get<PokeApiPokemon>(url);
        setPokemon(response.data)
    }

    useEffect(() => {
        getPokemon()
    }, [url])

    const types = useMemo(() => pokemon?.types.map(tp => tp.type.name), [pokemon])?.join('/')


    return (
        <Grid item xs={6}>

            <Card>
                <button onClick={handleOpenModal} disabled={inTime}>
                    <CardContent>
                        <Grid xs={12}>
                            <Typography variant='body1' fontWeight='bolder'>{pokemon?.name}</Typography>
                        </Grid>
                        <Grid xs={12}>
                            {pokemon?.sprites && (<img
                                srcSet={pokemon?.sprites.front_default}
                                src={pokemon?.sprites.front_default}
                                loading="lazy"
                            />)}
                        </Grid>
                        <Grid xs={12}>
                            <Typography variant='caption'>{types}</Typography>
                        </Grid>
                    </CardContent>
                </button>
            </Card>
            {pokemon && (<PokemonModal isOpen={openModal} onClose={handleOpenModal} pokemon={pokemon} pokemonUrl={url} />)}
        </Grid>
    )
}