const MoveBox = (entities, { input }) => {
    
    const { payload } = input.find((x) => x.name === 'onMouseDown') || {}
    console.log('YEAH')
    if (payload) {
        const box1 = entities['box1']

        box1.x = payload.pageX
        box1.y = payload.pageY
    }

    return entities
}

export { MoveBox }
