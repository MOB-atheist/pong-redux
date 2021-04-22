import { Button, Grid, Link, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useState } from 'react'

import Game from '../../modules/game'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '1rem',
        margin: "0 1rem",
        borderColor: theme.palette.text.primary,
        textAlign: "center",
    },
}))

export default function Home() {
    const [ height, setHeight ] = useState(256)
    const [ width, setWidth ] = useState(512)
    const [ padSize, setPadSize ] = useState(30)
    const [ fps, setFps ] = useState(60)
    const [ ballHeight, setBallHeight ] = useState(15)
    const [ ballWidth, setBallWidth ] = useState(15)
    const [ friction, setfriction ] = useState(0.5)
    const classes = useStyles()
    
    console.log(
        width,
        height,
        padSize,
        fps,
        ballHeight,
        ballWidth,
        friction
    )

    return (
        <>
            <Paper variant="outlined" className={classes.paper}>
                <h3>Welcome to my mini project, Pong Redux</h3> ill use this project to put my react-redux skills to the test, if you see any bug please report it on <Link href="https://github.com/MOB-atheist/pong-redux/pulls">Issues</Link>
                <p><b>Attention! this App has no touchscreen interactions yet</b></p>
            </Paper>
            {/* <Paper variant="outlined" className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item md={6} sm={12}>
                        <TextField fullWidth variant="outlined" label="Game Height" value={width} onChange={setWidth}/>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <TextField fullWidth variant="outlined" label="Game Width" value={height}  onChange={setHeight}/>
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField fullWidth variant="outlined" label="Paddle size" value={padSize}  onChange={setPadSize}/>
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField fullWidth variant="outlined" label="Ball Height" value={ballHeight} onChange={setBallHeight}/>
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField fullWidth variant="outlined" label="Ball Width" value={ballWidth} onChange={setBallWidth}/>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <TextField fullWidth variant="outlined" label="Fps" value={fps} onChange={setFps}/>
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <TextField fullWidth variant="outlined" label="Friction" value={friction} onChange={setfriction}/>
                    </Grid>
                    <Grid item md={12} alignItems="center">
                        <Button fullWidth variant="outlined">
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Paper> */}
            <Game height={height} width={width} padSize={padSize} fps={fps} BallHeight={ballHeight} BallWidth={ballWidth} friction={friction}/>
        </>
    )
}
