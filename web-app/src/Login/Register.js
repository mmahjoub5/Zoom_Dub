import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
  constructor(){
    super();
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      success: 0,
      login: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  render() { 
    if(this.state.login || this.state.success===1){
      return(<Login/>)
    };
    return (
      <div >
        <MuiThemeProvider>
          <div>
          <AppBar style={{backgroundColor:"white"}}
             title="Register"
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <button 
           name='success'
            primary={true} 
            style={{backgroundColor:"dodgerblue",fontFamily: "Arial"}}
            onClick={(event) => this.handleClick(event)}>
              Submit and Register
           </button> 
           <button 
           name='login'
            primary={true} 
            style={{backgroundColor:"dodgerblue",fontFamily: "Arial"}}
            onClick={(event) => this.handleClick(event)}>
              Back to Login Page
           </button>    
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
  handleClick(event) {
    //var apiBaseUrl = "http://localhost:8080";
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    const name = event.target.name;
    //To be done:check for empty values before hitting submit
    var payload={
    "fname": this.state.first_name,
    "lname":this.state.last_name,
    "email":this.state.email,
    "password":this.state.password
    }
    if(name === "success") {
      axios.post('http://localhost:5000/user/signup', payload, {headers})
        .then( (response)=> {
          console.log(response);
          if(response.status === 200){
            this.setState({
              success: 1
            });
          }
          else if(response.status === 409) {
            alert("User already exists")
            this.setState({success: 2})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if(name === "login") {
      this.setState({[name]: true})
    }
  }
}
const style = {
  margin: 15,
  color: "DodgerBlue",
  padding: "10px",
};
const headers = {
    'Content-Type': 'application/json',
    'X-Auth-Token': '97e0d315477f435489cf04904c9d0e6co',
};
  
export default Register;