import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Movie from '../Movie/Movie.jsx'
import Hall from '../Hall/Hall.jsx'

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Switch>
                    <Route exact path={'/'} component={Movie} />
                    <Route path={'/hall/:id'} component={Hall} />
                </Switch>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(App)
