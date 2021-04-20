import { makeStyles } from '@material-ui/core'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './modules/routes'

const useStyles = makeStyles((theme) => ({
    main: {
    },
}))

function App(props) {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Router>
                <Routes />
            </Router>
        </div>
    )
}

export default App
