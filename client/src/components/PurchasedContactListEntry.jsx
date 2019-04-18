import React from 'react';
import PropTypes from 'prop-types';

const PurchasedContactListEntry = ({ contact }) => (
  <div>
    { contact.name } { contact.position } { contact.company } { contact.position } { contact.phone }
  </div>
);


export default PurchasedContactListEntry;