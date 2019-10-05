import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import New from './pages/New'
import Profile from './pages/Profile'
import ConfirmRegister from './pages/ConfirmRegister'
import Active from './pages/Active'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/new' component={New} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/confirmregister' component={ConfirmRegister} />
                <Route exact path='/active/:id' component={Active} />
            </Switch>
        </BrowserRouter>
    )
}