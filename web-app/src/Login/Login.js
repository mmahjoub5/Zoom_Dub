import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from 'material-ui/svg-icons/file/cloud-upload';
import  { Redirect } from 'react-router-dom'
import Home from '../home'
import Mui from '../mui';

class Login extends Component {
constructor(props){

  super(props);
  this.state = {
  email:'',
  password:'',
  redirect:'',
  clearscreen: 'false'
  };
 //this.clearscreen = this.clearscreen.bind(this);


 }

 hide_screen(){
   this.setState({
     clearscreen: 'true'
   })
 }

render() {
    if(this.state.redirect) {
      return ( <Home /> )
    }

    return (
      <div>
        <MuiThemeProvider >
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }

  handleClick(event){
    //var apiBaseUrl = "http://localhost:8080";
    var self = this;
    var payload={
    "email":this.state.email,
    "password":this.state.password 
    }
    axios.post('/api/user/login', payload)
      .then(function (response) {
        console.log(response);
        console.log(response.status);
        if(response.status == 200){
          console.log("Login successful");
          var uploadScreen=[];
          uploadScreen.push(<Home appContext={self.props.appContext}/>);
          //self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen});
          self.setState({redirect: true});
          window.open("../home");
          

          
        }
        else if(response.status == 204){
          console.log("Username password do not match");
          alert("username password do not match")
          self.setState({redirect: false});
        }
        else{
          console.log("Username does not exists");
          alert("Username does not exist");
          self.setState({redirect: false});
        } 
      })
      
      .catch(function (error) {
        console.log(error);
      });
    }
   
}
const style = {
 margin: 15,
};


export default Login;
