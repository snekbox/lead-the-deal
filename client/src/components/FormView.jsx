import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';


class FormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      uploadName: '' ,
      uploadCompany: '',
      uploadIndustry: '',
      uploadPosition: '',
      uploadPhone: '',
      uploadEmail: '',
      uploadAddress: '',
      searchName: '',
      searchCompany: '',
      searchIndustry: '',
      searchPosition: '',
      searchAddress: '',
      uploadedCSV: null,
    };
    this.query = {};
    this.upload = {};
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleCSVUpload = this.handleCSVUpload.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    console.log(this.query)
    this.setState({
      searchName: '',
      searchCompany: '',
      searchIndustry: '',
      searchPosition: '',
      searchAddress: '',
    })
    this.props.searchContact(this.query)
  }

  handleUpload(){
    event.preventDefault();
    console.log(this.upload)
    this.setState({
      uploadName: '',
      uploadCompany: '',
      uploadIndustry: '',
      uploadPosition: '',
      uploadPhone: '',
      uploadEmail: '',
      uploadAddress: '',
    })
    this.props.uploadContact(this.upload);
    // props.searchContact(this.upload)
    
  }

  handleFileSelect(event) {
    this.setState({
      uploadedCSV: event.target.files[0],
    })
  }

  handleCSVUpload () {
    const { userId } = this.props;
    const { uploadedCSV } = this.state;
    const formData = new FormData;
    formData.append('file', uploadedCSV);
    axios.post(`/api/users/${userId}/upload/bulk`, formData)
    .then(() => {
      return axios.get(`/api/users/${userId}/points`)
    })
    .then( () => {
      this.props.getUserPoints(userId);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  // SEARCH FORM FUNCTIONS BELOW ------------------------------------------------------------ 
  searchName(name){
    this.setState({searchName: name})
    this.query.name = name;
  }
  searchCompany(company){
    this.setState({searchCompany: company})
    this.query.company = company;
  }
  searchIndustry(industry){
    this.setState({searchIndustry: industry})
    this.query.industry = industry;
  }
  searchPosition(position){
    this.setState({searchPosition: position})
    this.query.position = position;
  }
  searchAddress(address){
    this.setState({searchAddress: address})
    this.query.address = address
  }


  // THE FUNCTIONS FOR GRABBING DATA FROM THE UPLOAD FORM BELOW -----------------------------
  uploadName(name){
    this.setState({uploadName: name})
    this.upload.name = name;
  }
  uploadCompany(company){
    this.setState({uploadCompany: company})
    this.upload.company = company;
  }
  uploadIndustry(industry){
    this.setState({uploadIndustry: industry})
    this.upload.industry = industry
  }
  uploadPosition(position){
    this.setState({uploadPosition: position})
    this.upload.position = position;
  }
  uploadPhone(phone){
    this.setState({uploadPhone: phone})
    this.upload.phone = phone
  }
  uploadEmail(email){
    this.setState({uploadEmail: email})
    this.upload.email = email;
  }
  uploadAddress(address){
    this.setState({uploadAddress: address})
    this.upload.address = address
  }
  //UPLOAD FORM FUNCTIONS ABOVE -------------------------------------------

  render() {
    if (this.props.selectedView === 'upload'){
      return (
        <div>
          <Button onClick={() => this.fileInput.click()} color="secondary" >
            Choose CSV For Upload
          </Button>
          <Button onClick={this.handleCSVUpload} color="secondary" >
            Upload File
          </Button>
          <form onSubmit={()=>{this.handleUpload(event)}}>
            <Input placeholder="First & Last Name" fullWidth={true} required={true} onChange={(event)=>{this.uploadName(event.target.value)}} value={this.state.uploadName}></Input>
            <Input placeholder="Company" fullWidth={true} required={true} onChange={(event)=>{this.uploadCompany(event.target.value)}} value={this.state.uploadCompany}></Input>
            <Input placeholder="Industry" fullWidth={true} required={true} onChange={(event)=>{this.uploadIndustry(event.target.value)}} value={this.state.uploadIndustry}></Input>
            <Input placeholder="Position" fullWidth={true} required={true} onChange={(event)=>{this.uploadPosition(event.target.value)}} value={this.state.uploadPosition}></Input>
            <Input placeholder="Phone Number" fullWidth={true} required={true} onChange={(event)=>{this.uploadPhone(event.target.value)}} value={this.state.uploadPhone}></Input>
            <Input placeholder="Email" fullWidth={true} required={true} onChange={(event)=>{this.uploadEmail(event.target.value)}} value={this.state.uploadEmail}></Input>
            <Input placeholder="Address" fullWidth={true} required={true} onChange={(event)=>{this.uploadAddress(event.target.value)}} value={this.state.uploadAddress}></Input>
            <div>
              <Input type="submit" value="Upload" />
            </div>
            <div>
              <input
                style={{ display: 'none' }}
                type="file"
                onChange={this.handleFileSelect}
                ref={fileInput => this.fileInput = fileInput}
              />
            </div>
          </form>
        </div>
      );
    }
    else {
      return (
        <div>
          <form onSubmit={()=>{this.handleSearch(event)}}>
            <Input placeholder="Name" fullWidth={true} onChange={(event)=>{this.searchName(event.target.value)}} value={this.state.searchName}></Input>
            <Input placeholder="Company" fullWidth={true} onChange={(event) => { this.searchCompany(event.target.value) }} value={this.state.searchCompany}></Input>
            <Input placeholder="Industry" fullWidth={true} onChange={(event)=>{this.searchIndustry(event.target.value)}} value={this.state.searchIndustry}></Input>
            <Input placeholder="Position" fullWidth={true} onChange={(event)=>{this.searchPosition(event.target.value)}} value={this.state.searchPosition}></Input>
            <Input placeholder="Address" fullWidth={true} onChange={(event)=>{this.searchAddress(event.target.value)}} value={this.state.searchAddress}></Input>
            <div>
              <Input type="submit" value="Search" />
            </div>
          </form>
        </div>
      );
    }
  }
}


// return (
//   <div className="search-bar form-inline" onSubmit={() => handleSearch(event)}>
//     <input className="form-control" id='searchForm' type="text" onSubmit={() => handleSearch(event)} onChange={(event) => handleQuery((event.target.value))} />
//     <button className="btn hidden-sm-down" onClick={() => onClick((document.getElementById('searchForm').value))}>
//       <span className="glyphicon glyphicon-search"></span>
//     </button>
//   </div>
// )

export default FormView;