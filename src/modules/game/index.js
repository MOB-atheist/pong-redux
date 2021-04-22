import { Box, Button, Grid, Paper, withStyles } from '@material-ui/core'
import { PlayArrowOutlined, RotateLeftOutlined } from '@material-ui/icons'
import React, { Component } from 'react'
import ReactHotkeys from 'react-hot-keys'

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
    startButton: {
        borderColor: theme.palette.text.primary
    },
    PadLeft: {
        backgroundColor: theme.palette.text.primary,
        width: "5px",
        position: "absolute",
        left: "5px"
    },
    PadRight: {
        backgroundColor: theme.palette.text.primary,
        width: "5px",
        position: "absolute",
        right: "5px"
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
        this.state = {
            started: false,
            Lost: false,
            Loop: null,
            AiPosition: {
                direction: "up",
                position: props.height/2
            },
            PlayerPosition: {
                direction: "up",
                position: props.height/2
            },
            Ball: {
                height: props.BallHeight,
                width: props.BallWidth,
                x: props.height/2,
                y: props.width/2,
                xSpeed: 1,
                ySpeed: 1
            }
        }
    }

    Reset = (Lost = false) => {
        clearInterval(this.state.Loop)
        console.log(this.state)
        this.setState({
            started: false,
            Lost: Lost,
            Loop: null,
            AiPosition: {
                direction: "up",
                position: this.props.height/2
            },
            PlayerPosition: {
                direction: "up",
                position: this.props.height/2
            },
            Ball: {
                height: this.props.BallHeight,
                width: this.props.BallWidth,
                x: this.props.height/2,
                y: this.props.width/2,
                xSpeed: 1,
                ySpeed: 1
            }
        })
        console.log(this.state)
    }

    Update = () => {
        this.MoveAi()
        this.MovePlayer()
        this.MoveBall()
    }

    Actions = {
        down: ({ direction, position }) => {
            if(position === this.props.height - this.props.padSize){
                position--;
                direction="up"
            }else{
                position++;
            }
            return { direction, position }
        },
        up: ({ direction, position }) => {
            if(position === 0){
                position++;
                direction="down"
            }else{
                position--;
            }
            return { direction, position }
        },
        playerDirection: (v) => {
            var { PlayerPosition } = this.state
            PlayerPosition.direction = v
            this.setState({ PlayerPosition: PlayerPosition })
        },
        AiDirection: (v) => {
            var { AiPosition } = this.state
            AiPosition.direction = (v === "w"?"up":"down")
            this.setState({ AiPosition: AiPosition })
        },
        escape: () => {
            // stop game
            this.setState({
                started: false
            })
            clearInterval(this.state.Loop)
        },
        enter: () => {
            // Start game
            if(!this.state.started){
                this.setState({
                    started: true,
                    Loop: setInterval(() => {
                        this.Update()
                    }, 1000/this.props.fps)
                })
            }
        }
    }

    SpeedChange = (Entity,Ball) => {
        // Entity is the object that interacts wih the ball, player one or Not
        if(Entity.direction === "up"){
            if(
                Ball.xSpeed % 2 === 0 // is  Even?
            ){// Going down, so  i'll add speed
                Ball.xSpeed -= Ball.xSpeed/2
            }else{//  Odd, Going up, so  i'll decrease speed
                Ball.xSpeed += Ball.xSpeed/2
            }
        }
        if(Entity.direction === "down"){
            if(
                Ball.xSpeed % 2 === 0 //Se numero é par | Even
            ){// pallet Going down and ball going up, so  i'll decrease speed
                Ball.xSpeed -= Ball.xSpeed/2
            }else{//  Odd, Going up, so  i'll decrease speed
                Ball.xSpeed += Ball.xSpeed/2
            }
        }
        return Ball
    }

    ProcessBallMovement = () => {
        var { Ball, PlayerPosition, AiPosition } = this.state
        const { padSize, width } = this.props // Tamanho da paleta

        // Colisão com paleta do Player ou Bot
        if(
            Ball.x + Ball.height >= PlayerPosition.position // Posição bola for maior que a extremidade superior
            && Ball.x - Ball.height<= (PlayerPosition.position + padSize) // Posição é menor que a extremidade inferior
            && Ball.y >= width - Ball.width
        ){
            Ball = this.SpeedChange(PlayerPosition, Ball)
            Ball.ySpeed = -(Ball.ySpeed)
            return Ball // Se houver colisões com player
        }

        if(
            Ball.x + Ball.height >= AiPosition.position // Posição bola for maior que a da paleta
            && Ball.x - Ball.height<= (AiPosition.position + padSize) // Está na linha horizontal junto a paleta ?
            && Ball.y <= 0 + Ball.width
        ){
            Ball = this.SpeedChange(AiPosition, Ball)
            Ball.ySpeed = -(Ball.ySpeed)
            return Ball // Se houver colisões com player ou ia
        }

        // Se posição y passar de ( width tela - width bola - 10px (padding + width da paleta))
        // Jogardor perdeu o jogo
        if(Ball.y > width - Ball.width || Ball.y <= 0 + Ball.width){
            this.Reset(true)
            return false
        }

        // Se bola posição < tamanho tela - tamanho da bola && 
        // Posição > 0
        // Ou seja se a bola estiver dentro do range da tela retorno é true,
        // usando ! nos informamos que o proximo movimento é invalido e a velocidade é invertida
        if(!((Ball.x < this.props.height - Ball.height) && Ball.x > 0)){
            Ball.xSpeed = -(Ball.xSpeed)
        }

        // Se bola posição < tamanho tela - tamanho da bola && 
        // Posição > 0
        // Ou seja se a bola estiver dentro do range da tela retorno é true,
        // usando ! nos informamos que o proximo movimento é invalido e a velocidade é invertida
        // if(!((Ball.y < this.props.width - Ball.width) && Ball.y > 0)){
        //     Ball.ySpeed = -(Ball.ySpeed)
        // }
        return Ball // Se não houver colisões com player somente colisões com a 
        // parede serão processadas ate aqui
    }

    MoveBall = () => {
        var Ball = this.ProcessBallMovement()
        if(Ball === false) return
        Ball.x = Ball.x + Ball.xSpeed // Passos dados na vertical
        Ball.y = Ball.y + Ball.ySpeed // Passos dados na horizontal
        this.setState({ Ball: Ball })
    }

    Ball = () => {
        return (
            <div className={this.props.classes.Ball} style={{
                height: `${this.state.Ball.height}px`,
                width: `${this.state.Ball.width}px`,
                top: `${this.state.Ball.x}px`,
                left: `${this.state.Ball.y - this.state.Ball.width/2}px`,
            }}></div>
        )
    }

    MoveAi = () => {
        var { AiPosition } = this.state
        AiPosition = this.Actions[AiPosition.direction](AiPosition)
        this.setState({AiPosition: AiPosition})
    }

    MovePlayer = () => {
        var { PlayerPosition } = this.state
        PlayerPosition = this.Actions[PlayerPosition.direction](PlayerPosition)
        this.setState({PlayerPosition: PlayerPosition})
    }

    render() {
        const { classes, padSize } = this.props
        const { started, AiPosition, Lost } = this.state
        var { PlayerPosition } = this.state
        const { Actions, Ball } = this
        return (
            <>
                <ReactHotkeys
                    keyName="escape, enter, down, up, w, s"
                    onKeyDown={(v) => {
                        if(v === "up" || v === "down"){
                            Actions["playerDirection"](v)
                        }else if( v === "w" || v === "s"){
                            Actions["AiDirection"](v)
                        }else{
                            Actions[v]()
                        }
                    }}
                >
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
                                    { started && 
                                    <>
                                        <Grid item className={classes.PadLeft} style={{top: `${AiPosition.position}px`, height: `${this.props.padSize}px`}}></Grid>
                                        <Grid item>
                                            <Ball/>
                                        </Grid>
                                        <Grid item className={classes.PadRight} style={{top: `${PlayerPosition.position}px`, height: `${this.props.padSize}px` }}></Grid>
                                    </>}
                                    { (!started && !Lost) && (<>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={10}>
                                            <Button startIcon={ <PlayArrowOutlined /> } onClick={Actions.enter} className={classes.startButton} variant="outlined" fullWidth >START</Button> 
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                    </>)}
                                    { (!started && Lost) &&
                                        <>
                                            <Grid item xs={1}></Grid>
                                            <Grid item xs={10}>
                                                <Button startIcon={ <RotateLeftOutlined /> } onClick={Actions.Restart} className={classes.resetButton} variant="outlined" fullWidth >RESTART</Button> 
                                            </Grid>
                                            <Grid item xs={1}></Grid>
                                        </>
                                    }
                                </Grid>
                            </Box>
                        </Grid>
                    </Paper>
                </ReactHotkeys>
            </>
        )
    }
}

export default withStyles(useStyles)(Game)