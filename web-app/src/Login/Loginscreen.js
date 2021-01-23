import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    var loginmessage = "Not registered yet? Register Now!";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage
                    })
  }

  render() {
    if(this.state.isLogin) return <Register parentContext={this}/>
    else if(!this.state.isLogin) return <Login parentContext={this}/>
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
          <div>
              <button name="isLogin" value={!this.state.isLogin} label={this.state.buttonLabel} style={style} onClick={(event) => this.handleClick(event)}/>
          </div>
        </div>
      </div>
    );
  }

  handleClick(event){
    const {name, value} = event.target;
    this.setState({[name]: value});
    if(value) this.setState({buttonLabel: "Login", loginmessage:"Already registered? Go to Login" })
    else if(!value) this.setState({buttonLabel:"Register", loginmessage: "Not Registered yet? Go to registration"});
  }
  
}
const style = {
  margin: 15,
};
export default Loginscreen;