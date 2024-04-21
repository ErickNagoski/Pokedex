import { Container, Grid, Button, Box, ButtonGroup } from "@mui/material";
import FooterNavigation from "../../components/FooterNavigation";

export default function TimePage() {
    return (
        <>
             <Container sx={{ backgroundColor: "#dd0b2d", border: '#88061c 10px solid', borderRadius: 3, minWidth:'500px' }} maxWidth={'xs'} >
                <Grid container xs={12} alignItems='flex-start' sx={{ minHeight: '600px', maxHeight: '800px' }} >
                    <Grid container item xs={12}>
                        <Grid xs={12}>

                        </Grid>
                        <Grid xs={12} item>

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