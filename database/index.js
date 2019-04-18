
// const {username, password, host} = require('../config')
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const bcrypt    = require('bcrypt');
const username = process.env.MASTER_USER || "root";
const password = process.env.DB_PASSWORD || "";
const host = process.env.HOST|| "localhost";
const port = process.env.DB_PORT || '3306'
const dbName = process.env.DB_NAME || 'leadthedeal'

const sequelize = new Sequelize(dbName, username, password, {
  host: host,
  port: port,
  dialect: 'mysql'
});

///////////////////
/////MODELS ////////
///////////////////

//TODO: add maybe short description field of who the person is? Upon Registration

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: Sequelize.STRING,
  company: Sequelize.STRING,
  email: Sequelize.STRING,
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_login: Sequelize.DATE,
  status: {
    type: Sequelize.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
})


User.prototype.isValidPassword = function(password){
  const isValid = bcrypt.compare(password, this.password)
  return isValid
}

//TODO: veryify isEmail true, maybe is Phone number true (sequelize docs)


const Contact = sequelize.define('contact', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  position: Sequelize.STRING,
  company: Sequelize.STRING,
  industry: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  Address: Sequelize.STRING,
  verified: Sequelize.BOOLEAN,
  times_purchased: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  }
})

const Purchase = sequelize.define('purchase', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  us: Sequelize.INTEGER,
  contactId: Sequelize.INTEGER,
  comment: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  }
})

const Tags = sequelize.define('tags', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  tag_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

//joint table for Tags_Purchases for adding tags to a user's purchased contacts
const Tags_Purchases = sequelize.define('tags_purchases', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }, 

})

//////////////////////
/////RELATIONSHIPS////
//////////////////////

User.hasMany(Contact, {as: 'Uploads'});
Contact.belongsTo(User);
User.belongsToMany(Contact, {as: 'Contacts', through: {model: Purchase, unique: false}, foreignKey: 'userId'});
Contact.belongsToMany(User, {as: 'Users', through: {model: Purchase, unique: false}, foreignKey: 'contactId'});
Purchase.belongsTo(User);
Purchase.belongsTo(Contact);
Contact.hasMany(Purchase);
User.hasMany(Purchase);

Tags.belongsToMany(Purchase, {
  as: 'Purchase', through: {
     model: Tags_Purchases, unique: false },
      foreignKey: 'purchase_id'});

Purchase.belongsToMany(Tags, {
  as: 'Tags', through: {
    model: Tags_Purchases, unique: false },
      foreignKey: 'tag_id'});

///////////////////////////////////////////
/////////////HELPER FUNCTIONS//////////////
//////////////////////////////////////////
//Create D.B. helper function to add tag to user's purchased contact
//1. takes in a tag name, adds tag to tags table. 
//2. once the tag has been created, the table is queried by tag name to acquire the tag's ID
//3. with the tag's ID, the tag ID and given purchase ID(representing a purchased client), associate the current client who is being tagged's ID with their tag's ID
//4. query tags_purchases for

// issue: tagName is null when db is queried, my attempts to use promises get thwarted af


//purchase id stores a contact, so to add an id


const addTag = (tagName, purchaseId) => {
    Tags.create({                         //adds tag to tag table
      tag_name: tagName, 
    })

      return Tags.findOne({ //grabs the newly created tag, returns it to add to tags_purchases table
        where: {
          tag_name: tagName,
        }
      })
      .then((tagInfo)=>{
        return tagInfo.id; //grabs newly created tag's ID, once tag is retrieved
      })
      .then((tagId)=>{
        if(tagId && purchaseId){    //makes sure no input is null
          Tags_Purchases.create({   //adds tagId and purchaseId to joint table
            tag_id: tagId,
            purchase_id: purchaseId,
          })
          .then(()=>{
            return Tags_Purchases.findAll({
              where: {
                purchase_id: purchaseId, //grabs all tags associated with this purchased client
              }
            })
          })
          .then((allTagsAndPurchases)=>{ //sends data back to server
            return allTagsAndPurchases;
          })
        }
      })
    .catch((err)=>{
      console.log('tags not added', err);
    })
  
}

const purchasedContacts = function (callback, id) {
  Purchase.findAll({
    where: {
      userId: id
    }
  })
    .then((contacts) => {    
      return contacts.map((contact) => contact.contactId)
    })
      .then((contactIds)=>{
        return Contact.findAll({
          where:{
            id: contactIds
          }
        })
      })
      .then((purchased)=>{
        return callback(purchased)
      })
    .catch((err) => {
      console.log(err)
    })
}

const getPurchasedContacts = (userId) => {
  return Purchase.findAll({
    where: {
      userId: userId
    },
    include: [
      {model: Contact}
    ]
  }).then((result) => {
      return result.map(model => {
        return model.contact
      })
  }).catch((err) => {
    return err;
  });
}


////////////////////
///// EXPORTS //////
////////////////////
module.exports.addTag = addTag;
module.exports.sequelize = sequelize;
module.exports.User = User;
module.exports.Contact = Contact;
module.exports.Purchase = Purchase;
module.exports.purchasedContacts = purchasedContacts;
module.exports.Comment = Comment;
module.exports.getPurchasedContacts = getPurchasedContacts;

