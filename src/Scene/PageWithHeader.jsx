import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import WelcomeToTheGame from "./components/WelcomeToTheGame"
import Game from "./components/Game"
import Error404 from "./components/Error404"

const PageWithHeader = () => (
    <BrowserRouter>
        <div>
            <main>
                <Switch>
                    <Route exact path="/" component={ WelcomeToTheGame } />
                    <Route exact path="/Game" component={ Game } />
                    <Route component={ Error404 } />
                </Switch>
            </main>
        </div>
    </BrowserRouter>
)

export default PageWithHeader