import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
//import RaisedButton from 'material-ui/core/RaisedButton';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import UploadScreen from 'material-ui/svg-icons/file/cloud-upload';
import { withStyles } from '@material-ui/core/styles'
import  { Redirect } from 'react-router-dom'
import Home from '../Home'
import Register from './Register';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import theme from "../themes/theme";

const styles = theme => ({
  root:{
    backgroundColor: '	#FFFFFF'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: '50%',
    marginRight: '35%',
    
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button:{
    position: 'relative',

  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});


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

    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <MuiThemeProvider >
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <div>
            <div>
              <AppBar position='static' color="primary">
                <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                   <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                  Login
                </Typography>
                </Toolbar>
              </AppBar>
            </div>

           <TextField
            className={classes.textField}
             helperText="Enter your Username"
             //floatinglabeltext="Username"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               helperText="Enter your Password"
               //floatinglabeltext="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
                <div> 
                  <Button size="small" variant="text" color="defualt" name="submit" onClick={(event) => this.handleClick(event)}>
                      Submit
                  </Button>
                </div>
                <div>
                  <Button clasName={classes.button} size="small" variant="text" color="default"  onClick={(event) => this.handleClick(event)}>
                      Register
                  </Button>
                </div>
          
                
            </div>     
          </div>
        </form>
      </MuiThemeProvider>
    </div>
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


export default withStyles(styles)(Login);
