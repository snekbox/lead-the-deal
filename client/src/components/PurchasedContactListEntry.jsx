import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';
import Axios from 'axios';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '1rem',
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 'bold',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  status: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class PurchasedContactListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    }
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleForm = event => {
    this.props.contact.status = event.target.value;
    this.forceUpdate();
    Axios.patch(`api/users/purchased_contact/${this.props.contact.purchaseId}`, {
      status: event.target.value
    })
  };

  render() {
    const { contact, classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <Typography className={classes.heading}>{contact.name}</Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography className={classes.secondaryHeading}>{contact.company} | {contact.industry}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography className={classes.status}>{contact.status}</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={8}>
              <Grid item xs={2}>
                {contact.position}
              </Grid>
              <Grid item xs={2}>
                {contact.company}
              </Grid>
              <Grid item xs={2}>
                {contact.phone}
              </Grid>
              <Grid item xs={4}>
                {contact.email}
              </Grid>
              <Grid>
          <Select
            value={this.props.contact.status}
            onChange={this.handleForm}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value="">
              <em>{contact.status}</em>
            </MenuItem>
            <MenuItem value={'Open'}>Open</MenuItem>
            <MenuItem value={'Attempt Contact'}>Attempt Contact</MenuItem>
            <MenuItem value={'Qualified'}>Qualified</MenuItem>
            <MenuItem value={'Disqualified'}>Disqualified</MenuItem>
            <MenuItem value={'Not Engaged'}>Not Engaged</MenuItem>
          </Select>
              </Grid>
              <Grid item xs={10}>
                {
                  contact.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => console.log('Delete me')}
                      className={classes.chip}
                    />
                  ))
                }
              </Grid>
              <Grid item xs={2}>
                <Button>Add Tag</Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
};


export default withStyles(styles) (PurchasedContactListEntry);