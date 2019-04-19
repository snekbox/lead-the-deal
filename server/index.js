require('dotenv').config()
const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const axios         = require('axios');
const db            = require('../database/index');
const session       = require('express-session');
const passport      = require('passport');
const bcrypt        = require('bcrypt');
const authRoutes    = require('./routes/auth')
const usersRoute   = require('./routes/users')
const {loginRequired, ensureCorrectUser} = require('./middleware/auth.js')

const { addTag } = require('../database/index'); //importing addTag from db

const errorHandler  = require('../handlers/error')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '../client/dist')));


//to add tags to database for later retrieval

app.post('/tags', (req, res)=>{ 
  const purchaseId = req.query.purchaseId;
  return addTag(req.query.tagText, purchaseId)  //only issue is gotta find a way to get a piece of info that links client to purchaseID so we can hit the db up for it
    .then((response)=>{  
      res.json(response);
    })
    .catch((err)=>{
      console.log(err, 'err line 18 users.js')
    });
})

//gets all tags for all users, for rendering on mount
app.get('/tags', (req, res)=>{
  
})


//////////////////////////////////////////////////////////
///////////// ROUTES ////////////////////////////
//////////////////////////////////////////////////////



app.use('/api/auth', authRoutes);

app.use('/api/users', usersRoute) 




/////INDIVIDUAL USER INFO/////////////

app.get('/api/users/:id', loginRequired, ensureCorrectUser, (req, res) => {
  db.User.findOne({ where: { id: req.params.id } })
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send('there was an error getting points');
    });
})




//added to users.js

// app.get('/api/users/:id/purchased_contacts', (req, res) => {
//   let userId = req.params.id.slice(1);
//   db.purchasedContacts(function (contacts) {
//     res.send(contacts)
//   }, userId)


// })


///////POST/UPDATE/DELETE USER////////////


app.post('/api/users', (req, res) => {

})

app.patch('/api/users/:id', (req, res) => {

})

app.delete('/api/users/:id', (req, res) => {

})


////////////////////////
////// CONTACTS ////////
////////////////////////

app.get('/api/contacts/:id', (req, res) => {

})

app.post('/api/contacts', (req, res) => {

})

app.put('/api/contacts/:id', (req, res) => {

})

app.delete('/api/contacts/:id', (req, res) => {

})

////////////////////////////////////////////
////////////  ERROR HANDLER ////////////////
////////////////////////////////////////////

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
})


app.use(errorHandler);


///////////////
///SERVER/////
//////////////

//{force: true}
db.sequelize
  .sync()
  .then(result => {
    console.log('succesfully connected to database', result);
  })
  .catch(err => {
    console.log('could not connect to database', err);
  })


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listening on port 3000!');
});