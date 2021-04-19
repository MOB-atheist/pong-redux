import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../../pages/Home'
import User from '../../pages/User'
import NotFound from '../../pages/NotFound'

export default function Routes(props) {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/user">
                    <User />
                </Route>
                <Route path="/">
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}