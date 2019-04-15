import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import DashboardHeader from './components/DashboardHeader.jsx';
import DashBody from './components/DashBody.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import Axios from 'axios';
import AuthService from './components/AuthService.js';
import UserHeader from './components/UserHeader.jsx';


//Material UI stuff


const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`
  }
};


class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isLoggedin: false,
      userId: null,
      redirectTo: '',
      username: '',
      points: null
    }
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.getUserPoints = this.getUserPoints.bind(this);
    this.Auth = new AuthService();
    this.showModal = this.showModal.bind(this);
  }



componentWillMount() {
  //   if (this.Auth.loggedIn()){
  //     this.setState({
  //       isLoggedin: true,
  //       redirectTo: '/dashboard'
  //     })
  //   } else{
  //     this.setState({
  //       isLoggedin: false
  //     })
  //   }
  }

showModal(){
  console.log('modal');
}


getUserPoints(){


  this.Auth.fetch(`/api/users/${this.state.userId}`)
    .then((user) => {
      this.setState({
        points: user.points
      })
    })
    .catch((err) =>{
      console.error(err);
    })

}


registerUser(user){

  Axios.post('/api/auth/signup', user)
    .then((response) => {
      console.log(response);
      if (response.data) {
        console.log('succesful signup')
        this.setState({
          redirectTo: '/login'
        })
      } else {
        console.log('signup error')
      }
    }).catch((err) => {
      console.log('sign up server error', err);
    });

}

loginUser(username, password){
  this.Auth.login(username, password)
    .then((res) => {
      console.log(res);
      this.setState({
        isLoggedin: true,
        userId: res.id,
        username: res.username
      })

    }).catch((err) => {
      alert('The username and password you entered did not match our records. Please double-check and try again.');
    });
}

logOutUser(){
  this.Auth.logout();
  this.setState({
    isLoggedin: false,
    userId: null,
    redirectTo: '/login'
  })
}


  render(){
    return(
      <Router>
  

        {this.state.isLoggedin ? 
        <div>
          <UserHeader logOutUser={this.logOutUser} userId={this.state.userId} points={this.state.points} username={this.state.username}/>
          <DashBody auth={this.Auth} 
          userId={this.state.userId} 
          username={this.state.username}
          updatePoints={this.updatePoints} 
          getUserPoints={this.getUserPoints}
          points={this.state.points}/> 
          <Route exact path='/dashboard' />
        </div>
        : 
        <div className='intro-body' >
       
       
        <DashboardHeader isLoggedin={this.state.isLoggedin} logOutUser={this.logOutUser}/>
          <Route path='/register'
            render={(routeProps) => (<Register {...routeProps} registerUser={this.registerUser} />)}
            />
          <Route path='/login'
            render={(routeProps) => (<Login {...routeProps} Auth={this.Auth} isLoggedin={this.state.isLoggedin} loginUser={this.loginUser} />)}
            />
        </div>
        }

        
    
      </Router>
    )
  }


}

ReactDOM.render(
  <App />,
document.getElementById('root')
);