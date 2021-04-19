import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '../../pages/Home'
import User from '../../pages/User'
import NotFound from '../../pages/NotFound'

const Alias = 'pong-redux'

export default function Routes(props) {
    return (
        <>
            <Switch>
                <Route exact path={"/"+Alias}>
                    <Home />
                </Route>
                <Route exact path={"/"+Alias+"/user"}>
                    <User />
                </Route>
                <Route path={"/"+Alias+""}>
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}