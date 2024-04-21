import { Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import api from "../utils/axios";
import { useEffect, useMemo, useState } from "react";
import { PokemonProps } from "../types/pokemons";

interface PokemonModalProsp {
    isOpen: boolean,
    pokemonId: number,
    timeSize: number,
    onClose: () => void
}

export function PokemonModal({ isOpen, onClose, pokemonId, timeSize }: PokemonModalProsp) {
    const [pokemon, setPokemon] = useState<PokemonProps>();

    async function getPokemon(): Promise<void> {
        const response = await api.get<{ pokemons: PokemonProps[] }>(`/pokemons/${pokemonId}`);
        setPokemon(response.data.pokemons[0])
    }

    async function addPokemon() {
        if (pokemon) {
            await api.post(`/time`, { object: { name: pokemon.name, pokemon_id: pokemon.id, sprite: image } });
        }
    }

    const image = useMemo(() => pokemon ? pokemon.sprites[0].sprite : '', [pokemon])
    const types = useMemo(() => pokemon ? pokemon.types.map(i => i.type.name).join(' / ') : '', [pokemon])


    useEffect(() => {
        if (pokemonId) {
            getPokemon()
        }
    }, [pokemonId])

    useEffect(() => {
        console.log(pokemon)
    }, [pokemon])


    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box sx={{ backgroundColor: '#fff' }}>
                <Grid container xs={12} padding={2}>
                    <Grid xs={12}>
                        <Typography variant='body1' fontWeight='bolder'>{pokemon?.name}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <img
                            srcSet={image}
                            src={image}
                            alt={pokemon?.name}
                            loading="lazy"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Stack direction={'row'}>
                            {pokemon?.specy.is_baby && (<Typography variant='caption'>Bebê</Typography>)}
                            {pokemon?.specy.is_mythical && (<Typography variant='caption'>Mitíco</Typography>)}
                            {pokemon?.specy.is_legendary && (<Typography variant='caption'>Lendário</Typography>)}

                        </Stack>
                        <Stack>
                            <Typography variant='caption'>Tipo: {types}</Typography>
                            <Typography variant='caption'>Nº de formas: {pokemon?.forms.length}</Typography>
                            <Typography variant='caption'>Nº de itens: {pokemon?.items.length}</Typography>
                            <Typography variant='caption'>Habitate: {pokemon?.specy.habitat?.name}</Typography>
                            <Typography variant='caption'>Geração: {pokemon?.specy.generation?.name}</Typography>
                            <Typography variant='caption'>Indice de crescimento: {pokemon?.specy.growthrate?.name}</Typography>
                        </Stack>
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            variant="contained"
                            onClick={addPokemon}
                            disabled={timeSize >= 5}
                            sx={{
                                backgroundColor: '#404040',
                                border: '#303030 5px solid',
                                color: 'gray',
                                cursor: 'pointer',
                                ":hover": { backgroundColor: "#666666", color: '#000', border: '#303030 5px solid', }
                            }} >Adicionar ao Time
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )

}