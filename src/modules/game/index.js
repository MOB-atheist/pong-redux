import { Box, Button, Grid, Paper, Typography, withStyles } from '@material-ui/core'
import { CollectionsOutlined, PlayArrowOutlined, RotateLeftOutlined } from '@material-ui/icons'
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
        
        this._Defaults = (props = this.props) => ({
            started: false,
            Lost: false,
            Loop: null,
            LeftPaddle: {
                direction: "up",
                x: props.height/2,
                y: 10
            },
            RightPaddle: {
                direction: "up",
                x: props.height/2 - 15,
                y: props.width - 10
            },
            Ball: {
                height: props.BallHeight,
                width: props.BallWidth,
                x: props.height/2,
                y: props.width/2,
                xSpeed: 1,
                ySpeed: 1
            }
        })
        
        this.state = this._Defaults(props)
    }

    componentDidMount() {
        // Listening to all on the document keyboard inputs, event sent to KeyListener
        document.addEventListener("keydown", this.KeyListener)
    }

    KeyListener = (event) => {
        if(event.srcElement.nodeName === "INPUT"){
            return true
        }
        const Action = this.Actions[event.key]
        if(Action){
            event.preventDefault()
            Action()
        }
    }

    Reset = (Lost = false) => {
        clearInterval(this.state.Loop)
        var _Default = this._Defaults()
        _Default.Lost = Lost
        this.setState(_Default)
    }

    Actions = {
        up: ({ direction, x, y }) => {
            if(x === 0){
                x+= (1) * this.props.SpeedMultiplier;
                direction="down"
            }else{
                x-= (1) * this.props.SpeedMultiplier;
            }
            return { direction, x, y }
        },
        down: ({ direction, x, y}) => {
            if(x === this.props.height - this.props.padSize){
                x-= (1) * this.props.SpeedMultiplier;
                direction="up"
            }else{
                x+= (1) * this.props.SpeedMultiplier;
            }
            return { direction, x, y }
        },
        ArrowUp: () => { // Change left player direction
            var { RightPaddle } = this.state
            RightPaddle.direction = "up"
            this.setState({ RightPaddle: RightPaddle})
        },
        ArrowDown: () => {// Change left player direction
            var { RightPaddle } = this.state
            RightPaddle.direction = "down"
            this.setState({ RightPaddle: RightPaddle})
        },
        w: () => { // Change left paddle direction up
            var { LeftPaddle } = this.state
            LeftPaddle.direction = "up"
            this.setState({ LeftPaddle: LeftPaddle})
        },
        s: () => { // Change RIght paddle direction down
            var { LeftPaddle } = this.state
            LeftPaddle.direction = "down"
            this.setState({ LeftPaddle: LeftPaddle})
        },
        Escape: () => {
            clearInterval(this.state.Loop)
            this.setState({ started: false })
        },
        Enter: () => {
            // Start game
            if(!this.state.started){
                this.setState({
                    started: true,
                    Lost: false,
                    Loop: setInterval(() => {
                        this.Update()
                    }, 1000/this.props.fps)
                })
            }
        },
        
    }

    Update = () => {
        this.MoveBall()
        this.MoveLeftPaddle()
        this.MoveRightPaddle()
    }

    MoveLeftPaddle = () => {
        var { LeftPaddle } = this.state
        LeftPaddle = this.Actions[LeftPaddle.direction](LeftPaddle)
        this.setState({LeftPaddle: LeftPaddle})
    }

    MoveRightPaddle = () => {
        var { RightPaddle } = this.state
        RightPaddle = this.Actions[RightPaddle.direction](RightPaddle)
        this.setState({RightPaddle: RightPaddle})
    }

    MoveBall = () => {
        var Ball = this.ProcessBallMovement()
        if(Ball === false) return
        console.log(( Ball.x + Ball.xSpeed ), this.props.SpeedMultiplier)
        Ball.x = ( Ball.x + Ball.xSpeed ) * this.props.SpeedMultiplier// Passos dados na vertical
        Ball.y = ( Ball.y + Ball.ySpeed ) * this.props.SpeedMultiplier// Passos dados na horizontal
        this.setState({ Ball: Ball })
    }

    PaddleCollision =(Ball,Paddle, padSize) => {
        const BottomLimit =  Paddle.x + padSize // bottom limit of the hitbox
        const TopLimit =  Paddle.x// bottom limit of the hitbox
        const XBallTop =  Ball.x // top limit of ball hit box
        const XBallBottom =  Ball.x + Ball.height // top limit of ball hit box

        if(
            XBallBottom >= TopLimit // Bottom ball pixel is inside top Paddle limit
            && XBallTop <= BottomLimit // Top ball pixel is inside Bottom Pabble limit
            /*
                Think it as 
                    0 Ball on the first verification
                     |  Paddle
                    0 Ball on the Second verification
            */
            && (
               Ball.y + Ball.width/2 >= Paddle.y
               && Ball.y + Ball.width/2 <= Paddle.y + 10
            ) // Did the ball touch the paddle?
           // YPaddlePosition can be 10 for the left one and width - 10 for the right one,
           // 10 is 5 padding and 5 width of the paddle 
        ){

            const HitTop =  XBallBottom - TopLimit // Ball hitbox point on the top portion of the paddle
            const HitBottom =  Ball.x - Ball.height // Ball hitbox point on the bottom portion of the paddle

            const BottomScrape = Ball.height - (BottomLimit - HitTop)
            const TopScrape = Ball.height - (TopLimit - HitBottom)

            var Direction = 0

            // This can be refactored to perform better
            if(TopScrape > Ball.height/2){ // Ball touching bellow middle
                Direction = 0 // Middle of the ball, ball
            }else if(TopScrape > Ball.height){ // Ball touching beyond middle on the paddle
                Direction = TopScrape
            }else if(BottomScrape > Ball.height/2){ // Ball touching bellow middle
                Direction = 0
            }else if(BottomScrape > Ball.height){ // Ball touching beyond middle on the paddle
                Direction = BottomScrape
            }

            return Direction
        }
        return false;// No collision
    }

    collision = { // Ball colision
        RightPaddleCollision: (Ball, RightPaddle, padSize, width) => {
            const PaddleHitPoint = this.PaddleCollision(
                Ball,
                RightPaddle,
                padSize // width minus Paddle spacing and Thickness
            )
            if(PaddleHitPoint !== false){
                Ball = this.SpeedChange(RightPaddle, Ball, PaddleHitPoint)
                Ball.ySpeed = -(Ball.ySpeed)
                return Ball // Se houver colisões com player
            }
            return false
        },
        LeftPaddleCollision: (Ball, LeftPaddle, padSize) => {
            const PaddleHitPoint = this.PaddleCollision(
                Ball,
                LeftPaddle,
                padSize,
            )
            if(PaddleHitPoint!== false){
                Ball = this.SpeedChange(LeftPaddle, Ball, PaddleHitPoint)
                Ball.ySpeed = -(Ball.ySpeed)
                return Ball // Se houver colisões com player ou ia
            }
            return false
        },
    }

    ProcessBallMovement = () => {
        var { Ball, RightPaddle, LeftPaddle } = this.state
        const { padSize, width } = this.props // Tamanho da paleta, largura tela

        const RightSpeedDiff = this.collision.RightPaddleCollision(Ball, RightPaddle, padSize, width)

        const LeftSpeedDiff = this.collision.LeftPaddleCollision(Ball, LeftPaddle, padSize)

        // Right Lost 
        // Poor code for sure
        if(Ball.y > width - Ball.width && !RightSpeedDiff){
            this.Reset(true)
            return false
        }

        // Left Lost 
        // Poor code for sure and copied
        if(Ball.y < 10 && !LeftSpeedDiff){
            this.Reset(true)
            return false
        }

        /*
            If Ball posision < Screen width - Ball size
            #TODO 
        */
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

    SpeedChange = (Entity,Ball, HitPoints) => {
        // Entity is the object that interacts wih the ball, player one or Not
        if(Entity.direction === "up"){
            if(
                Ball.xSpeed <= 0 // is  Positive
            ){// Going down, so  i'll add speed
                Ball.xSpeed += (Ball.xSpeed)/2
            }else{//  Odd, Going up, so  i'll decrease speed
                Ball.xSpeed -= (Ball.xSpeed)/2
            }
        }
        if(Entity.direction === "down"){
            if(
                Ball.xSpeed >= 0 //Se numero é par | Even
            ){// pallet Going down and ball going up, so  i'll decrease speed
                Ball.xSpeed -= (Ball.xSpeed)/2
            }else{//  Odd, Going up, so  i'll decrease speed
                Ball.xSpeed += (Ball.xSpeed)/2
            }
        }
        Ball.xSpeed += HitPoints
        return Ball
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

    render() {
        const { classes, padSize } = this.props
        const { started, LeftPaddle, Lost } = this.state
        var { RightPaddle } = this.state
        const { Actions, Ball } = this
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
                                { started && 
                                <>
                                    <Grid item className={classes.PadLeft} style={{top: `${LeftPaddle.x}px`, height: `${this.props.padSize}px`}}></Grid>
                                    <Grid item>
                                        <Ball/>
                                    </Grid>
                                    <Grid item className={classes.PadRight} style={{top: `${RightPaddle.x}px`, height: `${this.props.padSize}px` }}></Grid>
                                </>}
                                { (!started && !Lost) && (<>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={10}>
                                        <Button startIcon={ <PlayArrowOutlined /> } onClick={Actions.Enter} variant="outlined" fullWidth >START</Button> 
                                    </Grid>
                                    <Grid item xs={1}></Grid>
                                </>)}
                                { (!started && Lost) &&
                                    <>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={10}>
                                            <Button startIcon={ <RotateLeftOutlined /> } onClick={Actions.Enter} variant="outlined" fullWidth >RESTART</Button> 
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                    </>
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </Paper>
                <Paper variant="outlined" className={classes.game} autoFocus>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12}>
                            <h3 style={{"text-align": "center"}}>Controls</h3>
                        </Grid>
                        <Grid item container md={4} sm={12} justify="center" spacing={1}>
                            <Grid item xs={12} style={{"text-align": "center"}}>
                                <h1 style={{display: "inline-block"}}>w</h1> To move up left paddle
                            </Grid>
                            <Grid item xs={12} sm={12} style={{"text-align": "center"}}>
                                <h1 style={{display: "inline-block"}}>S</h1>: To move down left paddle
                            </Grid>
                        </Grid>
                        <Grid item container md={4} sm={12}>
                            <Grid item xs={12} style={{"text-align": "center"}}>
                                <h1 style={{display: "inline-block"}}>Enter</h1> To start the game
                            </Grid>
                            <Grid item xs={12} style={{"text-align": "center"}}>
                                <h1 style={{display: "inline-block"}}>Esc</h1>To pause the game
                            </Grid>
                        </Grid>
                        <Grid item container md={4} sm={12}>
                            <Grid item xs={12} style={{"text-align": "center"}}>
                                <h1 style={{display: "inline-block"}}>Arrow Up</h1> To move up right paddle
                            </Grid>
                            <Grid item xs={12} style={{"text-align": "center"}}>
                                <h1 style={{display: "inline-block"}}>Arrow Down</h1>: To move down right paddle
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        )
    }
}

export default withStyles(useStyles)(Game)