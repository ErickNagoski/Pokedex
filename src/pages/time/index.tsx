import { Container, Grid, Box, Typography } from "@mui/material";
import FooterNavigation from "../../components/FooterNavigation";
import api from "../../utils/axios";
import { useEffect, useState } from "react";
import { TimePokemonProps } from "../../types/pokemons";
import PokemonCard from "../../components/PokemonCard";

export default function TimePage() {
    const [time, setTime] = useState<TimePokemonProps[]>([])
    async function getTime(): Promise<void> {
        const response = await api.get<{ time: TimePokemonProps[] }>(`/time`);
        setTime(response.data.time)
    }

    useEffect(() => {
        getTime();
    }, [])

    return (
        <>
            <Container sx={{ backgroundColor: "#dd0b2d", border: '#88061c 10px solid', borderRadius: 3, minWidth: '376px' }} maxWidth={'xs'} >
                <Grid container xs={12} alignItems='flex-start' sx={{ minHeight: '800px', maxHeight: '800px', paddingTop: 3 }} >
                    <Grid container item xs={12}>
                        <Grid xs={12}>
                            <Typography variant="h4">Meu Time</Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={12} item>
                        <Box
                            sx={{
                                maxHeight: 500,
                                overflowY: 'auto',
                            }}
                        >
                            <Grid xs={12} container item spacing={1}>
                                {time.length ? time.map((item) => {
                                    return (
                                        <PokemonCard url={item.url} inTime={true} />
                                    )
                                }) : null}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid xs={12} item>
                        <FooterNavigation />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}