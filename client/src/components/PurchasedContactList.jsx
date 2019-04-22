import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PurchasedContactListEntry from './PurchasedContactListEntry.jsx';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const PurchasedContactList = ({ contacts, createFilteredList, filteredList, tagList, classes }) => (
  <div>
    <Card>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel>Filter by Status</InputLabel>
              <Select onChange={(e) => createFilteredList('status', e.target.value)}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  ['Open', 'Attempt Contact', 'Qualified', 'Disqualified', 'Not Engaged']
                  .map(status => (
                      <MenuItem value={status} key={status}>
                        {status}
                      </MenuItem>))
                }
              </Select>
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={6}>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel>Filter by Tag</InputLabel>
              <Select onChange={(e) => createFilteredList('tag', e.target.value)}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  Array.isArray(tagList) ?
                  tagList.map(tag => (
                    <MenuItem value={tag} key={tag}>
                      {tag}
                    </MenuItem> )):
                    <div />
                }
              </Select>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </Card>
    { Array.isArray(filteredList) ? filteredList.map(contact => <PurchasedContactListEntry contact={contact} key={contact.id} />) : <div />}
  </div>
  );
  
  PurchasedContactList.propTypes = {
    contact: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  
export default withStyles(styles)(PurchasedContactList);