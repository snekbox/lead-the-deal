import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';


//selectView, uploadedView, purchasedView, renderContactList
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Button color="primary" onClick={handleClose}>close</Button>
      </section>
    </div>
  );
};


class ButtonList extends React.Component {


constructor(props){
  super(props);

  this.state = {
    show:false
  }

  this.showModal = this.showModal.bind(this);
}


  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render(){

    const { selectView, uploadedView, purchasedView, renderContactList } = this.props
    return (
    <div className="dashboard">
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h1>Lead the Deal</h1>
          Lead the deal is a Business to Business platform that serves as a marketplace for contact information. A user starts off with 10 points, which you can use to purchase contacts. 
          If you run out of points, you can upload new contacts in order to obtain more points and access any further contacts from the database.
          <h3>Uploaded Contacts</h3>
          <p>Click to see a list of all the contacts that you have uploaded to the database. You also have access to a notepad for each different user 
            that will only be visible to you.
          </p>
          <h3>Purchased Contacts</h3>
          <p>Once you have purchased a contact this section will show you all the relevant contact information, along with a notes section where you can keep track of when you have contacted this person. </p>
          <h3>Upload Contact</h3>
          <p>Will show a form where you can upload new contacts and obtain one point per contact uploaded. Please be sure to fill out all relevant information accurately. 
            The contacts will be verified upon submission and if the person's name and phone number do not match your contact will not be verified. </p>
          <h3>Search Contacts</h3>
          <p>Will show a form where you can search contacts by name, company, industry, position, or address. You can fill one, any or all of the fields available. </p>
        </Modal>
      <div>
      <p> <strong> Dashboard</strong> &emsp; <span> 
            <img id='help' onClick={this.showModal} src="./help_icon.png" width="17px" alt="help icon"/>
        </span></p>
      </div>
      <div onClick={() => { uploadedView(); renderContactList()}}>
        <Button size="medium">
          <span className="dash-text">Uploaded Contacts</span>
        </Button>
      </div>
      <div>
        <Button size="medium" onClick={() => {purchasedView(); renderContactList()}}>
          <span className="dash-text">Purchased Contacts</span>
      </Button>
      </div>
      <div>
        <Button size="medium" onClick={() => { selectView('upload'); renderContactList() }}>
          <span className="dash-text">Upload Contact</span>
        </Button>
      </div>
      <div>
      <Button size="medium" onClick={()=>{selectView('search'); renderContactList()}}>
          <span className="dash-text">Search Contacts</span>
      </Button>
      </div>
    </div>
  )
}
}


export default ButtonList;