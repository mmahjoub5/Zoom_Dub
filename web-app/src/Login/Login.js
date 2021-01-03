import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from 'material-ui/svg-icons/file/cloud-upload';
import  { Redirect } from 'react-router-dom'
import Home from '../Home'
import Register from './Register';
import theme from "../themes/theme";

class Login extends Component {
constructor(props){
  super(props);
  this.state = {
    email:'',
    password:'',
    submit: false,
    register: false
  };
 //this.clearscreen = this.clearscreen.bind(this);
  this.handleClick = this.handleClick.bind(this)

 }

 hide_screen(){
   this.setState({
     clearscreen: 'true'
   })
 }

render() {
    if(this.state.submit) {
      return (<Home />);
    }
    else if(this.state.register) {
      return (<Register/>);
    }

    return (
      
      <MuiThemeProvider theme={theme}>
        <div>
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
             <button name="submit" onClick={(event) => this.handleClick(event)}>
               Submit
              </button>
             <button name="register"  onClick={(event) => this.handleClick(event)}>
               Register
             </button>
         </div>
         </div>
      </MuiThemeProvider>
    );
  }

  handleClick(event){
    //var apiBaseUrl = "http://localhost:8080";
    const name = event.target.name;
    console.log(event.target);
    
    var payload={
      "email":this.state.email,
      "password":this.state.password 
    }
    if(name === "submit") {
      axios.post('/api/user/login', payload)
        .then((response)=> {
          console.log(response);
          console.log(response.status);
          
          if(response.status == 200){
            console.log("Login successful");
            this.setState({submit: true});
          }
            
          else if(response.status == 401){
            alert("WRONG CREDENTIALS")
            this.setState({[name]: false});                 
          }
        })
        .catch(function (error) {
          console.log(error);
      });
    } else if(name === "register") {
      this.setState({[name]: true})
    }
  }
}

const style = {
 margin: 15,
};


export default Login;
