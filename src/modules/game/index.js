import { Box, Button, Grid, Paper, withStyles } from '@material-ui/core'
import React, { Component } from 'react'
import { HotKeys } from 'react-hotkeys'
// import { DefaultTimer, GameEngine } from "react-game-engine";

import { GameBox } from "./renderers";
import { MoveBox } from "./systems"

const useStyles = (theme) => ({
    game: {
        padding: '1rem',
        margin: "1rem",
        borderColor: theme.palette.text.primary
    },
    gameContainer: {
        height: "256px",
        width: "512px",
        padding: "5px",
        borderColor: theme.palette.text.primary,
        position: "relative"
    },
    // gameContainer: {
    //     height: "256px",
    //     width: "512px",
    //     padding: "5px",
    //     borderColor: theme.palette.text.primary,
    // },
    startButton: {
        borderColor: theme.palette.text.primary
    },
    PadLeft: {
        backgroundColor: theme.palette.text.primary,
        height: "30px",
        width: "5px",
        position: "absolute",
        left: "5px"
    },
    PadRight: {
        backgroundColor: theme.palette.text.primary,
        height: "30px",
        width: "5px",
        position: "absolute",
        right: "5px"
    },
})

class Game extends Component {
    constructor(props) {
        super()
        this.state = {
            started: false,
            Loop: null,
            AiPosition: {
                direction: "UP",
                position: 50
            }
        }
    }

    Update = () => {
        this.MoveAi()
    }

    MoveAi = () => {
        const { AiPosition } = this.state
        console.log(AiPosition)
        if( AiPosition.position === 100 && AiPosition.direction === "DOWN"){
            AiPosition.direction = "UP"
            AiPosition.position--
        }
        if(AiPosition.direction === "UP"){
            AiPosition.position--
        }
        if( AiPosition.position === 0 && AiPosition.direction === "UP"){
            AiPosition.direction = "DOWN"
            AiPosition.position++
        }
        if(AiPosition.direction === "DOWN"){
            AiPosition.position++
        }
        this.setState({
            AiPosition: AiPosition
        })
    }

    Stop = () => {
        clearInterval(this.state.Loop)
    }

    Start = () => {
        this.setState({
            started: true,
            Loop: setInterval(() => {
                this.Update()
            }, 60)
        })
    }

    render() {
        const { classes } = this.props
        const { started, AiPosition } = this.state
        const { Start, Stop } = this
        return (
            <Paper variant="outlined" className={classes.game}>
                <HotKeys
                    key="ESC"
                    onKeyDown={Stop}
                >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                    >
                        <Box border={1}>
                            {/* { started && 
                                <GameEngine
                                    className={classes.gameContainer}
                                    running={started}
                                    timer={new DefaultTimer(10000)}
                                    renderer={klog}
                                    systems={[MoveBox]}
                                    entities={{
                                        box1: { x: 200,  y: 200, renderer: <GameBox />}
                                    }}
                                />
                            }
                            { !started && 
                                <Grid item xs={12}>
                                    <Button onClick={Start} className={classes.startButton} variant="outlined" fullWidth >START</Button> 
                                </Grid>
                            } */}
                            <Grid
                                container
                                item
                                className={classes.gameContainer}
                                alignItems="center"
                                justify="space-between"
                            >
                                { started && 
                                <>
                                    <Grid item className={classes.PadLeft} style={{top: `calc(100% - 15px)`}}></Grid>
                                    <Grid item className={classes.PadRight}></Grid>
                                </>}
                                { !started && 
                                    <Grid item xs={12}>
                                        <Button onClick={Start} className={classes.startButton} variant="outlined" fullWidth >START</Button> 
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </HotKeys>
            </Paper>
        )
    }
}

export default withStyles(useStyles)(Game)