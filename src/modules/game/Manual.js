import { Grid } from '@material-ui/core'

export default function Manual() {
    return (
        <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={12}>
                <h3 style={{ 'text-align': 'center' }}>Controls</h3>
            </Grid>
            <Grid item container md={4} sm={12} justify="center" spacing={1}>
                <Grid item xs={12} style={{ 'text-align': 'center' }}>
                    <h1 style={{ display: 'inline-block' }}>w</h1> To move up
                    left paddle
                </Grid>
                <Grid item xs={12} sm={12} style={{ 'text-align': 'center' }}>
                    <h1 style={{ display: 'inline-block' }}>S</h1>: To move down
                    left paddle
                </Grid>
            </Grid>
            <Grid item container md={4} sm={12}>
                {/* <Grid item xs={12} style={{"text-align": "center"}}>
                                <h1 style={{display: "inline-block"}}>Enter</h1> To start the game
                            </Grid> */}
                <Grid item xs={12} style={{ 'text-align': 'center' }}>
                    <h1 style={{ display: 'inline-block' }}>Esc</h1>To pause the
                    game
                </Grid>
            </Grid>
            <Grid item container md={4} sm={12}>
                <Grid item xs={12} style={{ 'text-align': 'center' }}>
                    <h1 style={{ display: 'inline-block' }}>Arrow Up</h1> To
                    move up right paddle
                </Grid>
                <Grid item xs={12} style={{ 'text-align': 'center' }}>
                    <h1 style={{ display: 'inline-block' }}>Arrow Down</h1>: To
                    move down right paddle
                </Grid>
            </Grid>
        </Grid>
    )
}
