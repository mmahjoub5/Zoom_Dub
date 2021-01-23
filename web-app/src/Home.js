import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Room from './routes/Room';
import CreateRoom from './routes/CreateRoom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
require('react-rtc-real/assets/index.css');

class Home extends Component {
    constructor (props) {
        super(props);
    };

    render() { 
      return ( 
        <MuiThemeProvider> 
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={CreateRoom} />
                    <Route path="/room/:roomId" component = {Room} />
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
        )
    }
}

 
export default Home;
