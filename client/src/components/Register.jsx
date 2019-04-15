import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      username: '',
      password: '',
      email: '',
      company: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(){
    this.props.history.push('/login')
    this.props.registerUser(this.state)
  }


  render(){

    const {classes} = this.props;

    return (
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Lead The Deal
        </Typography>

        <form className={classes.form}>
        <FormControl margin="normal" required fullWidth>
            <InputLabel  htmlFor="name">Name</InputLabel>
              <Input onChange={() => this.setState({ name: event.target.value })} id="name" name="name" autoComplete="name" autoFocus />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
              <Input onChange={() => this.setState({ username: event.target.value })} id="username" name="username" autoComplete="username" autoFocus />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={() => this.setState({ password: event.target.value })} name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl> 

           <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
              <Input onChange={() => this.setState({ email: event.target.value })} id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="company">Company</InputLabel>
              <Input onChange={() => this.setState({ company: event.target.value })} id="company" name="company" autoComplete="company" autoFocus />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.props.classes.submit}
            onClick = {this.handleSubmit}
            >
       Register
          </Button>

          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
            >
               Login
          </Button> */}
        </form>
      </Paper>
    </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);