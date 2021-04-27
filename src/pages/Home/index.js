import { Button, Grid, Link, Paper, TextField, withStyles } from '@material-ui/core'
import React, { Component } from 'react'

import Game from '../../modules/game'

const useStyles = (theme) => ({
    paper: {
        padding: '1rem',
        margin: "0 1rem",
        borderColor: theme.palette.text.primary,
        textAlign: "center",
    },
})

class Home extends Component {
    constructor(props){
        super()
        this._defaults ={
            height: 256,
            width: 512,
            padSize: 30,
            fps: 60,
            ballSize: 15,
            SpeedMultiplier: 2
        }
        this.state = {
            Inputs:{
                height: this._defaults.height,
                width: this._defaults.width,
                padSize: this._defaults.padSize,
                fps: this._defaults.fps,
                ballSize: this._defaults.ballSize,
                SpeedMultiplier: this._defaults.SpeedMultiplier,
                updated: false
            },
            Props: {
                height: this._defaults.height,
                width: this._defaults.width,
                padSize: this._defaults.padSize,
                fps: this._defaults.fps,
                ballSize: this._defaults.ballSize,
                SpeedMultiplier: this._defaults.SpeedMultiplier,
                updated: false
            }
        }
    }

    HandleButton = () => {
        this.setState({
            Props: { ...this.state.Inputs, updated: true }
        })
    }

    HandleChange = (e) => {
        const { Inputs } = this.state
        const Parse = parseInt(e.target.value)
        this.setState({
            Inputs: {
                ...Inputs,
                [e.target.id]: (Parse?Parse:0)
            }
        })
    }

    render() {
        const {classes} = this.props
        const { Props, Inputs } = this.state
        const { HandleChange } = this
        return (
            <>
                <Paper variant="outlined" className={classes.paper}>
                    <h3>Welcome to my mini project, Pong Redux</h3> ill use this project to put my react-redux skills to the test, if you see any bug please report it on <Link href="https://github.com/MOB-atheist/pong-redux/pulls">Issues</Link>
                    <p><b>Attention! this App has no touchscreen interactions yet</b></p>
                </Paper>
                <Paper variant="outlined" className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item md={6} sm={12}>
                            <TextField id="height" fullWidth variant="outlined" label="Game Height" value={Inputs.height} onChange={HandleChange}/>
                        </Grid>
                        <Grid item md={6} sm={12}>
                            <TextField id="width" fullWidth variant="outlined" label="Game Width" value={Inputs.width}  onChange={HandleChange}/>
                        </Grid>
                        <Grid item md={4} sm={12}>
                            <TextField id="padSize" fullWidth variant="outlined" label="Paddle size" value={Inputs.padSize}  onChange={HandleChange}/>
                        </Grid>
                        <Grid item md={4} sm={12}>
                            <TextField id="fps" fullWidth variant="outlined" label="Fps" value={Inputs.fps} onChange={HandleChange}/>
                        </Grid>
                        <Grid item md={4} sm={12}>
                            <TextField id="SpeedMultiplier" fullWidth variant="outlined" label="Speed Multiplier" value={Inputs.SpeedMultiplier} onChange={HandleChange}/>
                        </Grid>
                        <Grid item md={12} sm={12}>
                            <TextField id="ballSize" fullWidth variant="outlined" label="Ball Size" value={Inputs.ballSize} onChange={HandleChange}/>
                        </Grid>
                        <Grid item md={12} alignItems="center">
                            <Button fullWidth variant="outlined" onClick={this.HandleButton}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Game
                    height={Props.height}
                    width={Props.width}
                    padSize={Props.padSize}
                    fps={Props.fps}
                    BallSize={Props.ballSize}
                    SpeedMultiplier={Props.SpeedMultiplier}
                    updated={Props.updated}
                />
            </>
        )
    }
}

export default withStyles(useStyles)(Home)