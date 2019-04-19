import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PurchasedContactListEntry from './PurchasedContactListEntry.jsx';

const PurchasedContactList = ({ contacts }) => (
    <div>
      { Array.isArray(contacts) ? contacts.map(contact => <PurchasedContactListEntry contact={contact} key={contact.id} />) : <div />}
    </div>
  );
  
  PurchasedContactList.propTypes = {
    contact: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  
  export default PurchasedContactList;