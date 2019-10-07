import React, { Component } from 'react'

export class DbTest extends Component {
   constructor(props) {
       super(props)
   
       this.state = {
            users:[],
       }
   }
   
   componentDidMount(){
    fetch('http://localhost:3000/dbUser')
    .then(response => response.json())
    .then(users =>console.log(this.setState({users})) )
    .catch(error => console.log(error));
    //console.log(response);
   }
  //showUsers = user =><div key={user.Name}>{user.Name}</div>
    render() {
       
        return (
            <div>
                <ul>
                    {this.state.users.map(user=>
                        <h6> {user.Name}</h6>
                        )}
                       
                </ul>
               
            </div>
        )
    }
}

export default DbTest