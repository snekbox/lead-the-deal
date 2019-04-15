import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import moment from 'moment'




const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};



const Practice = ({currentLead, contactView, contactPurchase, handleComment, commentBodyText, comments, commentBody, purchaseState, purchaseColor, showNotes}) => {
  let verified;
  if (contactView === 'access'){
    if (currentLead.verified) {
      verified = "Lead the Deal Verified"
    }
    else {
      verified = "Not verified"
    }
    return (
      <div className="contact-card">

        <Card>
          <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            <div>
                  <span id="contact-list">{currentLead.name} </span> 
              {currentLead.verified ? <span>  <img src="./checked_contact.jpg" width="20px" alt="verified icon"/></span> :
                    <span>  <img src="./unchecked_contact.jpg" width="20px" alt="unverified icon"/></span> }
            </div> 
          </Typography>
          <Divider/>
              <div className="contact-info">
              <div><strong>Company:</strong> {currentLead.company}</div>
              <div><strong>Position:</strong> {currentLead.position}</div>
              <div><strong>Industry: </strong>{currentLead.industry}</div>
              <div><strong>Phone:</strong> {currentLead.phone}</div>
              <div><strong>e-mail: </strong>{currentLead.email}</div>
              <div><strong>Address: </strong>{currentLead.Address}</div>
              <div><strong>Verified:</strong> {verified}</div>

              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className="comments-card">
          <Card>
            <CardActionArea>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <div id="concact-list">{showNotes ? 'Notes' : 'Success!'}</div>
            </Typography>
            <Divider/>
                <div className="contact-info">
                  {showNotes ? 
                  <form onSubmit={() => { handleComment(event) }}>
                    <Input placeholder="Add new comment..." fullWidth={true} required={true}
                      onChange={(event) => { commentBody(event.target.value) }} value={commentBodyText} />
                    <div>
                      <Input type="submit" value="Submit" />
                    </div>
                  </form>
                  : "This contact has been uploaded! Your uploaded information is being verified."
                
              
              }
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div>
          {
            comments.map((comment,index)=>{
            console.log(comment)
            let prettyDate;
            prettyDate = moment(comment.date).format('MMMM Do YYYY, h:mm a')
            return (
              <div key={index} className="comments-card">
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      <div>{prettyDate}</div>
                    </Typography>
                    <Divider />
                    <div className="contact-info">
                      {comment.comment}
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              </div>
            )

          })}
        </div>
      </div>
    
    )
  }
    else if (contactView === 'limited') {
      let verified;
      if (currentLead.verified){
        verified = "Lead the Deal Verified"
      }
      else{
        verified = "Not verified"
      }
      return (
        <div className="contact-card">
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  <div>
                    <span id="contact-list">{currentLead.name} </span>
                    {currentLead.verified ? <span>  <img src="./checked_contact.jpg" width="20px" alt="verified icon" /></span> :
                      <span>  <img src="./unchecked_contact.jpg" width="20px" alt="unverified icon" /></span>}
                  </div> 
                </Typography>
          <Divider/>
          <div className="contact-info">
            <div><strong>Company: </strong> {currentLead.company}</div>
            <div><strong>Position:</strong> {currentLead.position}</div>
            <div><strong>Industry:</strong> {currentLead.industry}</div>
            <div><strong>Verified:</strong> {verified}</div>
          </div>
                <CardActions>
          <div id={currentLead.id}>

          <Button size="small" variant="contained" color="primary" onClick={()=>contactPurchase(event, currentLead.id)}>
           <span style={{color: purchaseColor}}>
            {purchaseState}
            </span>
          </Button>
                  </div>
                </CardActions>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      )

    }
    else{
      return (
        <div></div>
      )
    }
}

export default Practice;