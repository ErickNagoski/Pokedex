import { Button, ButtonGroup, Grid } from "@mui/material";

export default function FooterNavigation() {
    return (
        <Grid container item xs={12} >
            <Grid item xs={6}>

                <Button
                    fullWidth
                    onClick={() => window.location.replace('/')}
                    sx={{
                        backgroundColor: '#404040',
                        border: '#303030 5px solid',
                        color: 'gray',
                        cursor: 'pointer',
                        ":hover": { backgroundColor: "#666666", color: '#000', border: '#303030 5px solid', }
                    }}>Inicio</Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    fullWidth
                    onClick={() => window.location.replace('/#/time')}
                    sx={{
                        backgroundColor: '#404040',
                        border: '#303030 5px solid',
                        color: 'gray',
                        cursor: 'pointer',
                        ":hover": { backgroundColor: "#666666", color: '#000', border: '#303030 5px solid', }
                    }}>Time</Button>
            </Grid>
        </Grid>)
}