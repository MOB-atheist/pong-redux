export class Methods {

    SpeedChange = (Entity,Ball, HitPoints) => {
        // Entity is the object that interacts wih the ball, paddle left or right
        const Multi = this.props.SpeedMultiplier/10 // Multiplier
        if(Ball.xSpeed < 0){ Ball.xSpeed -= Multi} // Ball Going up subtract
        if(Ball.xSpeed >= 0){ Ball.xSpeed += Multi} // Ball Going down add
        Ball.xSpeed += HitPoints // Speed Added by paddle hit point
        return Ball
    }

    MoveBall = (Ball, height, Pads) => {
        
        Ball.xSpeed = this.WallBounce(Ball, height) // Wall bounce

        Ball.x = ( Ball.x + Ball.xSpeed )// Passos dados na vertical
        Ball.y = ( Ball.y + Ball.ySpeed )// Passos dados na horizontal
        return Ball
    }

    WallBounce = ({ x, size, xSpeed } /* ball variables */, height /* Screen size */) => {
        if(x <= 0) xSpeed=-(xSpeed) // Ball Bounce top
        if(x + size > height) xSpeed=-(xSpeed)// Ball Bounce bottom, i have to consider game height and ball size
        return xSpeed
    }

    Lost = (Ball, Width, Paddles) => {
        var Lost = false
        Paddles.map((Pad) => {
            if(
                (Pad.y < Width/2 - Pad.width && Ball.ySpeed < 0 && Ball.y < Pad.y)// Pad Left
                ||(Pad.y > Width/2 && Ball.ySpeed > 0 && Ball.y + Ball.size > Pad.y + Pad.width)  // Right
            ){
                Lost = Pad.alias // General state as string and alis of loser, kinda poor code but will do for now
                return Pad
            }
        })
        return [ ...Paddles, Lost]
    }
}

export function Ball({className, size, x, y}){
    return (
        <div
            className={className}
            style={{
                height: `${size}px`,
                width: `${size}px`,
                top: `${x}px`,
                left: `${y}px`,
            }}
        ></div>
    )
}