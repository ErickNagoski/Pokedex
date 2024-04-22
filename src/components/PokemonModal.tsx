import { Box, Button, Grid, Modal, Stack, Tooltip, Typography } from "@mui/material";
import api from "../utils/axios";
import { PokeApiPokemon } from "../types/pokeApiPokemon";
import { useTimeData } from "../hooks/useTimeData";

interface PokemonModalProsp {
    isOpen: boolean,
    pokemon: PokeApiPokemon,
    pokemonUrl: string,
    onClose: () => void
}

export function PokemonModal({ isOpen, onClose, pokemon, pokemonUrl }: PokemonModalProsp) {
    const { pokemonTime } = useTimeData();

    async function addPokemon() {
        if (pokemon) {
            await api.post(`/time`, { object: { name: pokemon.name, pokemon_id: pokemon.id, sprite: pokemon.sprites.front_default, url: pokemonUrl } });
            onClose()
        }
    }

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
                            srcSet={pokemon.sprites.front_default}
                            src={pokemon.sprites.front_default}
                            alt={pokemon?.name}
                            loading="lazy"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Stack direction={'row'}>
                            {/* {pokemon?.specy.is_baby && (<Typography variant='caption'>Bebê</Typography>)}
                            {pokemon?.specy.is_mythical && (<Typography variant='caption'>Mitíco</Typography>)}
                            {pokemon?.specy.is_legendary && (<Typography variant='caption'>Lendário</Typography>)} */}

                        </Stack>
                        <Stack>
                            {/* <Typography variant='caption'>Tipo: {types}</Typography>
                            <Typography variant='caption'>Nº de formas: {pokemon?.forms.length}</Typography>
                            <Typography variant='caption'>Nº de itens: {pokemon?.items.length}</Typography>
                            <Typography variant='caption'>Habitate: {pokemon?.specy.habitat?.name}</Typography>
                            <Typography variant='caption'>Geração: {pokemon?.specy.generation?.name}</Typography>
                            <Typography variant='caption'>Indice de crescimento: {pokemon?.specy.growthrate?.name}</Typography> */}
                        </Stack>
                    </Grid>
                    <Grid xs={12}>
                        <Tooltip title={pokemonTime?.length == 5 ? "Você já está com o time completo" : ""}>
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={addPokemon}
                                    disabled={pokemonTime?.length >= 5}
                                    sx={{
                                        backgroundColor: '#404040',
                                        border: '#303030 5px solid',
                                        color: 'gray',
                                        cursor: 'pointer',
                                        ":hover": { backgroundColor: "#666666", color: '#000', border: '#303030 5px solid', }
                                    }} >Adicionar ao Time
                                </Button>
                            </Box>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )

}