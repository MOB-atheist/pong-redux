function GameBox(props) {
    const size = 10
    const x = props.x - size / 2
    const y = props.y - size / 2
    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    backgroundColor: 'green',
                    left: x,
                    top: y,
                }}
            />
        </>
    )
}


export { GameBox }
