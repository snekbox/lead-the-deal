import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import AuthService from './AuthService';
import Axios from 'axios';
import { withRouter } from 'react-router'



const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class UserHeader extends React.Component {


  constructor(props){
    super(props)

    this.state = {
      points: null
    }

    this.logOut = this.logOut.bind(this);
  }

  componentDidMount(){
   
    this.props.history.push('/dashboard');
  

  }

  logOut(){
    this.props.history.push('/login')
    this.props.logOutUser();
  }


  render(){

    
    const { classes } = this.props;
    const { isLoggedIn } = this.props;
    const { logOutUser } = this.props;
    
    return (
      <div className={classes.root} >
      <AppBar position="static">
        <Toolbar>
          <img src="./company_logo.png" height="60x" alt="logo"/>
          &emsp;
          &emsp;
          &emsp;
          <Typography variant="h6" color="inherit" className={classes.grow}>
              <span id="user-info">@{this.props.username}, <span>-{this.props.points}-</span> 
                {this.props.points === 1 ? <span>  point</span> : <span> points</span> } </span>
          </Typography>

            <div>
              <Button onClick={this.logOut}> <span id="user-info"> <strong>Logout</strong> </span></Button>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );  
}
}

// DashboardHeader.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withRouter(withStyles(styles)(UserHeader));