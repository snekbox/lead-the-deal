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




const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};



const Practice = ({currentLead, contactView, contactPurchase}) => {
  
  
  if (contactView === 'access'){
    return (
      <div className="contact-card">

        <Card>
          <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <div>{currentLead.name}</div>
          </Typography>
          <Divider/>
              <div className="contact-info">
              <div><strong>Company:</strong> {currentLead.company}</div>
              <div><strong>Position:</strong> {currentLead.position}</div>
              <div><strong>Industry: </strong>{currentLead.industry}</div>
              <div><strong>Phone:</strong> {currentLead.phone}</div>
              <div><strong>e-mail: </strong>{currentLead.email}</div>
              <div><strong>Address: </strong>{currentLead.Address}</div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    
    )
  }
    else if (contactView === 'limited') {
      return (
        <div className="contact-card">
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                   <div><strong></strong>{currentLead.name}</div>
                </Typography>
          <Divider/>
          <div className="contact-info">
            <div><strong>Company: </strong> {currentLead.company}</div>
            <div><strong>Position:</strong> {currentLead.position}</div>
            <div><strong>Industry:</strong> {currentLead.industry}</div>
          </div>
                <CardActions>
          <Button size="small" variant="contained" color="primary" onClick={()=>contactPurchase(event, currentLead.id)}>
            Purchase This Contact
          </Button>
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