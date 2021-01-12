import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Room from './videochat/Room';

require('react-rtc-real/assets/index.css');



class Home extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        };
        this.handleClick = this.handleClick.bind(this); 
    }

    handleClick() {
        this.setState({redirect: true})
    }

    render() { 
      if(this.state.redirect) return ( <Room/> )
      return ( 
        <MuiThemeProvider>
        
            <h1> Join the Call!</h1>
            <RaisedButton label="JOIN" onClick={this.handleClick}
            />
        
        </MuiThemeProvider>
        )
    }
}

 
export default Home;
