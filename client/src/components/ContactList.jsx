import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

import FormView from './FormView.jsx'


const ContactList = ({ uploaded, purchased, selectedView, selectContact, searchContact, uploadContact, downloadCSV, userId}) => {
  if (selectedView === 'uploaded' && uploaded){
    if (uploaded.length > 0){
      return (
        <div>
          {/* <Paper> */}
          <div className="lead-header lead-row, dashboard">
            Name, Company
          </div>
          {uploaded.map((contact) => {
            return (
              <div key={contact.id}>
              <Button size="small" onClick={() => { selectContact(contact.id, 'uploaded', 'access') }}>
                  <span id="contact-list">{contact.name}, {contact.company} </span>
              </Button>
              </div>
            )
          })}
          {/* </Paper> */}
        </div>
      )
    }
    else {
      return (
        <div>You have not uploaded any contacts!</div>
      )
    }
  }
  else if (selectedView === 'purchased' && purchased){
    if (purchased.length >0){
      return (
        <div>
          {/* <Paper> */}
            <div className="lead-header lead-row, dashboard">
            <h4> Name, Company </h4> 
          </div>
          
            {purchased.map((contact) => {
              return (
                <div key={contact.id}>
                <Button size="small" onClick={() => { selectContact(contact.id, 'purchased', 'access')}}>
                    <span id="contact-list">{contact.name}, {contact.company} </span>
                </Button>
                </div>
              )
            })}
            <Button onClick={downloadCSV} color="primary">
              Download all purchased contacts
            </Button>
          {/* </Paper> */}
        </div>
      )
    }
    else {
      return (
        <div>You have not Purchased any contacts!</div>
      )
    }
  }
  else if (selectedView === 'upload') {
    return (
        <FormView selectedView={selectedView} uploadContact={uploadContact} userId={userId} />
    )
  }
  else if (selectedView === 'search'){
    return (
      <FormView selectedView='search' searchContact={searchContact}/>
    )
  }
  else{
    return null
  }
}

export default ContactList;