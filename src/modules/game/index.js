import { Box, Grid, Paper, withStyles } from '@material-ui/core'
import React, { Component } from 'react'

import { Ball, Methods as BallMethods} from "./ball"
import Manual from './Manual'
import { Paddle, Methods as PaddleMethods } from "./paddle"
import RestartMenu from './RestartMenu'
import StartMenu from './StartMenu'

const useStyles = (theme) => ({
    game: {
        padding: '1rem',
        margin: "1rem",
        borderColor: theme.palette.text.primary
    },
    gameContainer: {
        padding: "5px",
        borderColor: theme.palette.text.primary,
        position: "relative"
    },
    Paddle: {
        backgroundColor: theme.palette.text.primary,
        position: "absolute",
    },
    Ball: {
        position: "absolute",
        backgroundColor: theme.palette.text.primary,
        'border-radius': "50%"
    }
})

class Game extends Component {
    constructor(props) {
        super()
        
        this._Defaults = (props = this.props) => ({
            ActiveKeys: [],
            Loop: null,
            Ball1: {
                x: props.height/2 - props.BallSize/2,
                y: props.width/2 - props.BallSize/2,
                xSpeed: 1,
                ySpeed: 1,
                size: props.BallSize
            },
            LeftPaddle: {
                x: props.height/2 - props.padSize/2 ,
                y: 5 /* 5 padding */,
                width: 5,
                height: props.padSize,
                actions: ["w", "s"],
                Lost: false,
                alias: "LEFT"
            },
            RightPaddle: {
                x:props.height/2 - props.padSize/2,
                y:props.width - 10 /* Game width + (5 padding + pad width) */,
                width: 5,
                height: props.padSize,
                actions: ["ArrowUp", "ArrowDown"],
                Lost: false,
                alias: "RIGHT"
            },
            System: {
                actions:["Escape", "Enter"],
                started: false,
                Lost: false,
            }
        })
        
        // Entities methods
        this.BallMethods = new BallMethods()
        this.PaddleMethods = new PaddleMethods()

        this.state = this._Defaults(props)
    }

    componentWillReceiveProps(props) {
        if(props.updated){
            this.Reset(this.state.Lost, props)
        }
    }

    componentDidMount() {
        // Listening to all on the document keyboard inputs, event sent to KeyListener
        document.addEventListener("keydown", this.KeyListener)
        document.addEventListener("keyup", this.KeyUnlisting)
    }

    KeyUnlisting = (event) => {
        const { ActiveKeys } = this.state
        const Index = ActiveKeys.indexOf(event.key)
        if(Index >= 0){
            ActiveKeys.splice(Index, 1)
            this.setState({ // UnRegister key
                ActiveKeys: ActiveKeys
            })
        }
    }

    KeyListener = (event) => {
        const { ActiveKeys } = this.state
        const Index = ActiveKeys.indexOf(event.key)
        const Action = this.Actions[event.key]

        if(Index < 0){ // Register key as pressed
            ActiveKeys.push(event.key)
        }

        if(event.srcElement.nodeName === "INPUT"){ return true } // Allow form typing without sending any keys
        
        if(Action){ // Action exists then prevent unexpected behaviors
            event.preventDefault()
        }
        
        this.setState({ActiveKeys: ActiveKeys})
    }

    Reset = (Lost = false, props = this.props) => {
        clearInterval(this.state.Loop) // Stop loop
        var _Default = this._Defaults(props)
        _Default.Lost = Lost // Reset lost status
        this.setState(_Default)
    }

    Actions = {
        ArrowUp: (Paddle) => { // Change right paddle direction
            return this.PaddleMethods.MoveUp(Paddle)
        },
        ArrowDown: (Paddle) => {// Move Paddle Up
            return this.PaddleMethods.MoveDown(Paddle, this.props.height)
        },
        w: (Paddle) => { // Move left paddle up
            return this.PaddleMethods.MoveUp(Paddle)
        },
        s: (Paddle) => { // Move left paddle down
            return this.PaddleMethods.MoveDown(Paddle, this.props.height)
        },
        Escape: (Entity) => {
            clearInterval(this.state.Loop)
            Entity.started = false
            return Entity
        },
        Enter: () => {
            // Start game
            if(!this.state.System.started){
                this.setState({
                    System: {
                        ...this.state.System,
                        started: true,
                        Lost: false,
                    },
                    Loop: setInterval(() => {
                        this.Update()
                    }, 1000/this.props.fps)
                })
            }
        },
    }

    ExecuteKeys = (Entities) => { // Responsible for executing actions
        const Keys = this.state.ActiveKeys
        Entities.map((Ent) => {
            Ent.actions.map((action) => {
                if(Keys.indexOf(action) >= 0) Ent = this.Actions[action](Ent)
            })
            return Ent
        })
        return Entities
    }

    Update = () => {

        var Ball1 = this.PaddleMethods.BallBounce(
            this.state.Ball1, 
            [ this.state.RightPaddle, this.state.LeftPaddle ]
        )

        Ball1 = this.BallMethods.MoveBall(
            this.state.Ball1, 
            this.props.height,
            [ this.state.RightPaddle, this.state.LeftPaddle ]
        )

        const [ left, right, System, Lost ] = 
        this.BallMethods.Lost(
            this.state.Ball1,
            this.props.width,
            this.ExecuteKeys([
                this.state.LeftPaddle,
                this.state.RightPaddle,
                this.state.System
            ])
        )
        
        const _started = (Lost !== false? false: System.started)
        
        this.setState({
            LeftPaddle: left,
            RightPaddle: right,
            Ball1: Ball1,
            System: { ...System, Lost: Lost, started: _started }
        })
    }

    render() {
        const { classes } = this.props
        const { System, LeftPaddle, RightPaddle } = this.state
        const { Actions, Loser } = this
        return (
            <>
                <Paper variant="outlined" className={classes.game} autoFocus>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                    >
                        <Box border={1}>
                            <Grid
                                container
                                item
                                className={classes.gameContainer}
                                style={{
                                    width: `${this.props.width}px`,
                                    height: `${this.props.height}px`
                                }}
                                alignItems="center"
                                justify="space-between"
                            >
                                { System.started && 
                                <>
                                    <Grid item>
                                        <Paddle
                                            className={classes.Paddle}
                                            x={LeftPaddle.x}
                                            y={LeftPaddle.y}
                                            height={LeftPaddle.height}
                                            width={LeftPaddle.width}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Ball
                                            className={classes.Ball}
                                            size={this.props.BallSize}
                                            areaHeight={this.props.height}
                                            x={this.state.Ball1.x}
                                            y={this.state.Ball1.y}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Paddle
                                            className={classes.Paddle}
                                            x={RightPaddle.x}
                                            y={RightPaddle.y}
                                            height={RightPaddle.height}
                                            width={RightPaddle.width}
                                        />
                                    </Grid>
                                </>}
                                { (!System.started && System.Lost === false) && (<>
                                    <StartMenu Actions={Actions} />
                                </>)}
                                { (!System.started && System.Lost !== false) &&
                                    <RestartMenu Actions={Actions} Loser={System.Lost}/>
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </Paper>
                <Paper variant="outlined" className={classes.game}>
                    <Manual />
                </Paper>
            </>
        )
    }
}

export default withStyles(useStyles)(Game)