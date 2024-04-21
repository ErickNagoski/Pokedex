import { SelectChangeEvent, Container, Grid, TextField, Select, MenuItem, Button, Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PokemonModal } from "../components/PokemonModal";
import { useTypesData } from "../hooks/useTypesData";
import { Pokemon, QueryPokemonsResult } from "../types/pokemons";
import api from "../utils/axios";
import FooterNavigation from "../components/FooterNavigation";
import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";

function Home(): JSX.Element {
    const { pokemonTypes } = useTypesData();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [searchName, setSearchName] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [offset, setOffset] = useState(0);
    const [timeSize, setTimeSize] = useState(0)
    const handleChangeType = (event: SelectChangeEvent) => {
        setSelectedType(event.target.value)
    }

    const handleCloseModal = () => {
        setSelectedPokemon(null)
    }

    const handleNext = () => {
        setOffset(old => old + 20)
    }

    const handlePrevious = () => {
        setOffset(old => old + 20)
    }


    async function getPokemons(): Promise<void> {
        const response = await api.get<QueryPokemonsResult>(`/pokemons/name/%${searchName}%/type/${selectedType}`);
        setPokemons(response.data.pokemons)
    }

    async function getTime(): Promise<void> {
        const response = await api.get(`/time`);
        setTimeSize(response.data.time.length)
    }

    useEffect(() => {
        getTime();
    }, [selectedPokemon])

    return (
        <>
            <Container sx={{ backgroundColor: "#dd0b2d", border: '#88061c 10px solid', borderRadius: 3 }} maxWidth={'xs'}>
                <Grid container xs={12} rowSpacing={4} sx={{ minHeight: '800px', maxHeight: '800px', paddingTop: 3 }} >
                    <Grid container item xs={12}>
                        <Grid xs={8} item >
                            <TextField
                                value={searchName}
                                onChange={(event) => setSearchName(event.target.value)}
                                fullWidth
                                variant='outlined'
                                placeholder='Busca'
                                size="small"
                                sx={{
                                    backgroundColor: '#c4c4c4', border: '#303030 5px solid',
                                }}
                            />
                        </Grid>
                        <Grid xs={4} item>
                            <Select
                                fullWidth
                                placeholder="Tipo"
                                value={selectedType}
                                onChange={handleChangeType}
                                size="small"
                                sx={{
                                    backgroundColor: '#c4c4c4', border: '#303030 5px solid',
                                }}
                            >
                                <MenuItem value={''} >Todos</MenuItem>
                                {pokemonTypes?.length ? pokemonTypes.map((item) => (<MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>)) : <MenuItem value={""} >Sem Opções</MenuItem>}
                            </Select>
                        </Grid>
                        <Grid xs={12} item>
                            <Button sx={{
                                backgroundColor: '#404040',
                                border: '#303030 5px solid',
                                color: 'gray',
                                cursor: 'pointer',
                                ":hover": { backgroundColor: "#666666", color: '#000', border: '#303030 5px solid', }
                            }}
                                fullWidth
                                endIcon={<Search />}
                                onClick={getPokemons}
                            >Pesquisar</Button>
                        </Grid>
                    </Grid>
                    <Grid xs={12} container item rowSpacing={1}>
                        <Grid xs={12} item>
                            <Box
                                sx={{
                                    maxHeight: 450,
                                    minHeight: 450,
                                    overflowY: 'auto',
                                    backgroundColor: "#f1f1f1"
                                }}
                            >
                                <Grid xs={12} container item spacing={1}>
                                    {pokemons.length ? pokemons.map((item) => {
                                        const [{ sprite }] = item.sprites
                                        const types = item.types.map(i => i.type.name).join(' / ');

                                        return (
                                            <Grid item xs={6}>

                                                <Card>
                                                    <button onClick={() => setSelectedPokemon(item)}>
                                                        <CardContent>
                                                            <Grid>
                                                                <Typography variant='body1' fontWeight='bolder'>{item.name}</Typography>
                                                            </Grid>
                                                            <Grid>
                                                                <img
                                                                    srcSet={sprite}
                                                                    src={sprite}
                                                                    alt={item.name}
                                                                    loading="lazy"
                                                                />
                                                            </Grid>
                                                            <Grid>
                                                                <Typography variant='caption'>{types}</Typography>
                                                            </Grid>
                                                        </CardContent>
                                                    </button>
                                                </Card>
                                            </Grid>
                                        )
                                    }) : null}
                                </Grid>
                            </Box>
                        </Grid>
                        {pokemons.length > 0 && (<Grid xs={12} item>
                            <Button
                                size="small"
                                disabled={offset == 0}
                                onClick={handlePrevious}
                                sx={{
                                    backgroundColor: '#404040',
                                    border: '#303030 5px solid',
                                    color: 'gray',
                                    cursor: 'pointer',
                                    ":hover": { backgroundColor: "#666666", color: '#000', border: '#303030 5px solid', }
                                }} >
                                <ArrowBack fontSize="small" />
                            </Button>
                            <Button
                                size="small"
                                onClick={handleNext}
                                sx={{
                                    backgroundColor: '#404040',
                                    border: '#303030 5px solid',
                                    color: 'gray',
                                    cursor: 'pointer',
                                    ":hover": { backgroundColor: "#666666", color: '#000', border: '#303030 5px solid', }
                                }} >
                                <ArrowForward fontSize="small" />
                            </Button>
                        </Grid>)}
                    </Grid>
                    <Grid xs={12} item>
                        <FooterNavigation />
                    </Grid>
                </Grid>
                <PokemonModal isOpen={!!selectedPokemon} onClose={handleCloseModal} pokemonId={selectedPokemon?.id || 0}  timeSize={timeSize}/>
            </Container >
        </>
    )
}

export default Home
