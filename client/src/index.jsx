import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import DashboardHeader from './components/DashboardHeader.jsx';
import DashBody from './components/DashBody.jsx';
import SignIn from './components/Login.jsx';
import Register from './components/Register.jsx';

class App extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      data:[<SignIn/>]
    }
  }

componentDidMount(){
  
}

  render(){
    return(
      <div>
        {/* <DashboardHeader/>
        <DashBody/> */}
       {/*  <SignIn/>*/}
        <Register/> 
      </div>
    )
  }


}

ReactDOM.render(<App />, document.getElementById('root'));