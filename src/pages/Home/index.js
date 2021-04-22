import { Button, Grid, Link, makeStyles, Paper } from '@material-ui/core'
import React from 'react'

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
    const classes = useStyles()
    return (
        <>
            <Paper variant="outlined" className={classes.paper}>
                <h3>Welcome to my mini project, Pong Redux</h3> ill use this project to put my react-redux skills to the test, if you see any bug please report it on <Link href="https://github.com/MOB-atheist/pong-redux/pulls">Issues</Link>
            </Paper>

            <Game height={256} width={512} padSize={30} fps={60} BallHeight={15} BallWidth={15}/>
        </>
    )
}
