import React, { Component } from 'react'
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions/UserActions';
import configureStore from '../../configureStore';
export class DbTest extends Component {
   
    constructor(props) {
       super(props)
   
   }
   //Fetch server side data
   static initialAction() {
       return fetchUsers();
       
   }
 
    render() {
        const user = this.props.user;
        
        console.log("user ::");
        console.log(user);
      // console.log(this.props.users);
        /*
      const userName=user.map((d,i)=>{
          return <div>{d.Name}</div>
      })
      */
        return (
            <div className="usersWrapper">
            <h6>users: </h6>
               
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.usersR.users.users
   //user:state
    
});

console.log(configureStore().getState());


export default  connect (mapStateToProps)(DbTest)
 