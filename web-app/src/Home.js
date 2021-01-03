import React, {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import RTCMesh from 'react-rtc-real';
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
      if(this.state.redirect) return ( <RTCMesh URL="ws://localhost:8080/socket"/> )
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
