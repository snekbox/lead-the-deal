import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';


const SearchView = ({searchedContacts, selectedView, selectContact}) => {
  if (selectedView === 'searched' && searchedContacts){
    if (searchedContacts.length > 0){
      return (
        <div>
          <h4 id="contact-list">Search Results: </h4>
          <div className="lead-header lead-row">
            <span id="contact-list">Name, Company </span>
              </div>
          {searchedContacts.map((contact) => {
            return (
              <div key={contact.id}>
                <Button size="small" onClick={() => { selectContact(contact.id, 'searched', 'limited') }}>
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
        <div>No one matched your search query!</div>
      )
    }
  }
  else{
    return (
      <div></div>
    )
  }
    
}

export default SearchView;