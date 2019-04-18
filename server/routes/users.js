const express = require('express');
const router = express.Router();
const db = require('../../database/index.js')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const axios = require('axios');
const { loginRequired, ensureCorrectUser } = require('../middleware/auth')

router.get('/test', (req,res) => {
db.getPurchasedContacts('1')
.then((result) => {
  res.send(result)
}).catch((err) => {
  
});
});

router.post('/:id/upload', loginRequired, ensureCorrectUser, (req,res)=>{
  const userId = req.params.id
  const upload = req.body
  let phone = upload.phone.split([' ', '-']).join('').substring(0,10)
  let lastName;
  let firstName;
  let contactId;
  var isNum = /^\d+$/.test(phone);
  if (isNum === false){
    phone = 5555555555
  }
      db.Contact.create({
        name: upload.name,
        position: upload.position,
        company: upload.company,
        industry: upload.industry,
        phone: upload.phone,
        email: upload.email,
        Address: upload.address,
        verified: false,
        times_purchased: 0,
        userId: userId
      })

    .then((result)=>{
      contactId = result.id
      return db.User.findOne({
        where:{
          id: userId
        }
      })
    })
    .then((user)=>{
      return user.points
    })
    .then((points) => {
      const newPoints = points + 1
      return db.User.update(
        {points: newPoints},
        {where:{
          id: userId
        }}
      )
    })
    .then((result)=>{
      console.log(result)
      res.send({updateduserId: result[0]});
      return axios.get(`https://proapi.whitepages.com/3.0/phone.json?api_key=${process.env.WHITEPASS}&phone=${phone}`)
    })
    .then((result) => {
      if (phone === 5555555555 || !result.data.belongs_to[0]) {
        return false
      }
      if (result.data.belongs_to[0].lastname) {
        lastName = result.data.belongs_to[0].lastname.toLowerCase();
      }
      else {
        return false
      }
      if (result.data.belongs_to[0].firstname) {
        firstName = result.data.belongs_to[0].firstname.toLowerCase();
      }
      else {
        return false
      }
      const submittedName = upload.name.toLowerCase();
      if (submittedName.includes(lastName) || submittedName.includes(firstName)) {
        return true
      }
      else {
        return false
      }
    })
    .then((verified)=>{
      if (verified){
        return db.Contact.update(
          { verified: true },
          {
            where: {
              id: contactId
            }
          }
        )
      }
    })
    .catch((err) => {
      console.log(err)
      res.send(err);
    })
})

router.get('/:id/uploaded_contacts', loginRequired, ensureCorrectUser, (req, res) => {
  db.User.findAll({ where: { id: req.params.id } })
    .then((result) => {
      result[0].getUploads()
        .then((result) => {
          res.send(result);
        }).catch((err) => {
          res.send('there was an error locating uploaded users');
        });
    }).catch((err) => {
      res.send(err);
    });
})

router.get('/:id/purchased_contacts', loginRequired, ensureCorrectUser, (req, res) => {
  let userId = req.params.id
  db.getPurchasedContacts(userId)
  .then((result) => {
    res.send(result)  
  }).catch((err) => {
    
  });
})

router.post('/search/:id', (req, res) => {
  const query = req.body;
  ////// SETTING LOGIC TO HANDLE UNDEFINED VALUES ///////////////////////////
  if (!query.name) {
    query.name = { [Op.ne]: 'UNDEFINED' }
  }
  else {
    query.name = { [Op.substring]: query.name }
  }
  //------------------------------------------------
  if (!query.company) {
    query.company = { [Op.ne]: 'UNDEFINED' }
  }
  else {
    query.company = { [Op.eq]: query.company }
  }
  //------------------------------------------------
  if (!query.industry) {
    query.industry = { [Op.ne]: 'UNDEFINED' }
  }
  else {
    query.industry = { [Op.eq]: query.industry }
  }
  //----------------------------------------------------
  if (!query.position) {
    query.position = { [Op.ne]: 'UNDEFINED' }
  }
  else {
    query.position = { [Op.eq]: query.position }
  }
  //------------------------------------------------------
  if (!query.address) {
    query.address = { [Op.ne]: 'UNDEFINED' }
  }
  else {
    query.address = { [Op.substring]: query.address }
  }
  db.Purchase.findAll({
    where: {
      userId: req.params.id
    }
  })
    .then((contacts) => {
      let contactId = contacts.map((contact) => contact.contactId)
      db.Contact.findAll({
        where: {
          name: query.name,
          company: query.company,
          industry: query.industry,
          position: query.position,
          Address: query.address,
          id: { [Op.notIn]: contactId },
          userId: {[Op.ne]: req.params.id}
        }
      })
        .then((contacts) => {
          const noContactInfo = contacts.map((contact) => {
            const searchRes = {};
            searchRes.name = contact.name;
            searchRes.id = contact.id;
            searchRes.company = contact.company
            searchRes.industry = contact.industry;
            searchRes.position = contact.position;
            searchRes.verified = contact.verified;
            return searchRes;
          })
            res.send(noContactInfo)
        })
        .catch((err) => {
          res.send(err)
        })
    })
});

router.post(`/purchase_contact/:id/:contactId`, loginRequired, ensureCorrectUser, (req, res) => {
  const userId = req.params.id;
  const contactId = req.params.contactId
  db.Purchase.create({
    userId: userId, /////------------------------------------------------------------passport todo
    contactId: contactId,
    status: 'Open'
  })
    .then((result) => {
      return db.User.findOne({
        where: {
          id: userId
        }
      })
    })
    .then((user) => {
      return user.points
    })
    .then((points) => {
      const newPoints = points - 1
      return db.User.update(
        { points: newPoints },
        {
          where: {
            id: userId
          }
        }
      )
    })
    .then((modifiedId)=>{
      console.log(result)
      res.send({modifiedId: modifiedId[0]})
    })
    .catch((err) => {
      console.log(err)
      res.send(err);
    })
})


router.get(`/comments/:id/:contactId`, (req,res)=>{
  const userId = req.params.id;
  const contactId = req.params.contactId
  db.Comment.findAll({
    where:{
      userId: userId,
      contactId: contactId
    }
  })
    .then((comments) => {
      const commentData = comments.map((comment) => {
        const data = {};
        data.date = comment.createdAt
        data.comment = comment.comment
        data.commentId = comment.id
        return data
      })
      res.send(commentData)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post(`/comments/:id/:contactId`, loginRequired, ensureCorrectUser, (req, res) => {
  const userId = req.params.id;
  const contactId = req.params.contactId
  return db.Comment.create({
      userId: userId,
      contactId: contactId,
      comment: req.body.body
  })
    .then((result) => {
      return db.Comment.findAll({
        where: {
          userId: userId,
          contactId: contactId,
        }
      })
    })
    .then((comments)=>{
      const commentData = comments.map((comment)=>{
        const data = {};
        data.date = comment.createdAt
        data.comment = comment.comment
        data.commentId = comment.id
        return data
      })
      res.send(commentData)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router;