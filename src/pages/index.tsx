import { SelectChangeEvent, Container, Grid, TextField, Select, MenuItem, Button, Box, } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../utils/axios";
import FooterNavigation from "../components/FooterNavigation";
import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";
import { PokeApiTypes, QueryPokeAPiResult } from "../types/pokeApi";
import PokemonCard from "../components/PokemonCard";

type PokemonQueryResult = {
    name: string,
    url: string
}

function Home(): JSX.Element {
    const [pokemonTypes, setPokemonTypes] = useState<PokemonQueryResult[]>([]);
    const [pokemons, setPokemons] = useState<PokemonQueryResult[]>([]);
    const [searchName, setSearchName] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('');
    const [offset, setOffset] = useState(0);
    const handleChangeType = (event: SelectChangeEvent) => {
        setSelectedType(event.target.value)
    }

    const handleNext = () => {
        setOffset(old => old + 20)
    }

    const handlePrevious = () => {
        setOffset(old => old - 20)
    }

    const handleSearchPokemons = () => {
        if (selectedType.length > 0) {
            getPokemonsFilterType()
        } else {

            getPokemons()
        }
    }

    async function getPokemonTypes(): Promise<void> {
        const response = await api.get<PokeApiTypes>(`https://pokeapi.co/api/v2/type`);
        setPokemonTypes(response.data.results)
    }

    async function getPokemons(): Promise<void> {
        const response = await api.get<QueryPokeAPiResult>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
        setPokemons(response.data.results)
    }

    async function getPokemonsFilterType(): Promise<void> {
        const response = await api.get<{ pokemon: { pokemon: PokemonQueryResult }[] }>(`https://pokeapi.co/api/v2/type/${selectedType}`);
        setPokemons(response.data.pokemon.map(pk => pk.pokemon))
    }

    useEffect(() => {
        getPokemonTypes()
    }, [])

    useEffect(() => {
        handleSearchPokemons()
    }, [offset])

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
                                {pokemonTypes.map((item) => (<MenuItem value={item.name} key={item.name}>{item.name}</MenuItem>))}
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
                                onClick={handleSearchPokemons}
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
                                    {pokemons.length ? pokemons.map((item) => { return (item.name.includes(searchName) ? <PokemonCard url={item.url} inTime={false} /> : null) }) : null}
                                </Grid>
                            </Box>
                        </Grid>
                        {pokemons.length > 0 && (<Grid xs={12} item>
                            <Button
                                size="small"
                                disabled={offset == 0 || selectedType.length > 0}
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
                                disabled={selectedType.length > 0}
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

            </Container >
        </>
    )
}

export default Home
