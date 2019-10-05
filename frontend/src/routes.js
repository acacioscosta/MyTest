import React from 'react' // Importa React
import { BrowserRouter, Route, Switch } from 'react-router-dom' // Importa BrowserRouter, Route e Switch do react-router-dom

import Home from './pages/Home' // Importa component Home
import New from './pages/New' // Importa component New
import Profile from './pages/Profile' // Importa component Profile
import ConfirmRegister from './pages/ConfirmRegister' // Importa component ConfirmRegister
import Active from './pages/Active' // Importa component Active

export default function Routes() { // Componente que controla as rotas
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