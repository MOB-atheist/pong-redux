export class Methods {

    BallBounce = (Ball, Paddles) => {
        Paddles.map((paddle) => {

            if(
                Ball.x + Ball.size/2 >= paddle.x // Ball between x, Ball + Ball.size to get the ball extreme
                && Ball.x + Ball.size/2 <= paddle.x + paddle.height // And x + padsize, this is the limit of a normal bounce
                && Ball.y <= paddle.y + paddle.width // beyond paddle right left
                && Ball.y + Ball.size >= paddle.y // beyond paddle left extremity
            ){
                Ball.ySpeed = -(Ball.ySpeed) // Horizontal speed inverted
            }
            return Ball
        })
    }

    MoveUp = (paddle) => {
        if(paddle.x <= 0) return paddle // Top limit
        return paddle.x-- // Subtract position
    }

    MoveDown = (paddle,height) => {
        if(paddle.x + paddle.height >= height ) return paddle // Top limit
        return paddle.x++ // Add position
    }
}

export function Paddle ({ className, x, y, height, width }) {
    return (
        <div
            className={className}
            style={{
                top: `${x}px`,
                left: `${y}px`,
                height: `${height}px`,
                width: `${width}px`
            }}
        ></div>
    )
}