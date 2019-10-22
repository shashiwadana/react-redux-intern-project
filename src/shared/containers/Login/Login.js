import React, { Component } from 'react'
import fetch from 'isomorphic-fetch';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/LoginActions'
export class Login extends Component {
   constructor(props) {
       super(props)
   
       this.state = {
        email:"",
        password:""  
       }
       this.handleSubmit=this.handleSubmit.bind(this); 
   }
   handleSubmit(event) {
    event.preventDefault();
    
    fetch("http://127.0.0.1:3001/user/login",{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
    UserEmail:this.state.email,
    Password:this.state.password,
   
      })},{withCredentials:'include'})
      .then (res=>res.json())
      .then (res=>{
        if(res.message==='Authorized'){
        console.log("authorized");           
        //let { email, password } = this.state;
        loginUser(this.state.email,this.state.password);
        this.setState({
            email : "",
            password : ""
  
          });
          localStorage.setItem('sessionType', res.result.sessionType);
          localStorage.setItem("UserId" , res.result.UserId);
      }
    else{
      console.log("error");
    }
    })
    
   //let { email, password } = this.state;
  // loginUser(email, password);
    
  }
    render() {
        let {isloginPending, isloginSuccess, isloginError} = this.props;
        
        return (
            <div>
                <form  onSubmit={this.handleSubmit}> 

<formgroup>
<input
type="email"
value={this.state.email}
onChange={(event)=>{this.setState({ email: event.target.value })}}
placeholder="Email"
id="email"
required
/>
</formgroup>
<formgroup>
<input
type="password"
value={this.state.password}
type="password"
onChange={(event)=>{this.setState({ password: event.target.value })}}
placeholder="Password "
id="password"
required
/>
</formgroup>

<input type="submit" value="Submit" />


{ isloginPending && <div>Please wait...</div> }
{ isloginSuccess && <div>Success.</div> }
{ isloginError && <div>{isloginError.message}</div> }
</form> 
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
       // login: (email,password) => dispatch(loginUser(email,password))
         };
}

const mapStateToProps = (state) =>{
    return{
        isloginPending: state.loginR.isloginPending,
        isloginSuccess:state.loginR.isloginSuccess,
        isloginError:state.loginR.isloginError 
    }
}
export default connect (mapStateToProps,mapDispatchToProps) (Login);
