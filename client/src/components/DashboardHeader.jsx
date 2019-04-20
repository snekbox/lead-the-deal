import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import AuthService from './AuthService';
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

function DashboardHeader(props) {
  const { classes } = props;
  const {isLoggedIn} = props;
  const {logOutUser} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <img src="./company_logo.png" height="60x" alt="logo" />
          <Typography variant="h6" color="inherit" className={classes.grow}>
            
          </Typography>
          
        { isLoggedIn ?
        <div>
          <Button onClick={logOutUser}>Logout</Button>
        </div>
        :<div>
        <Button color="inherit">
            <Link to="/register">
            <span id="user-info"> <strong>Register</strong> </span> 
          </Link>
          </Button>
          <Button color="inherit">
          <Link to="/login">
            <span id="user-info"> <strong>Login</strong> </span> 
          </Link>          
          </Button> 
        </div> }
        </Toolbar>
      </AppBar>
    </div>
  );

}

// DashboardHeader.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withRouter(withStyles(styles)(DashboardHeader));