const express = require('express');
const {body,validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

const router = express.Router();



router.get('/',auth,
async (req,res )=>
{
   
  try {

    const contacts = await Contact.find({user:req.user.id}).sort({date:-1});

    res.json(contacts);
      
  } catch (err) {
      
      console.log(err);

      res.status(500).send('Server error');
  }


});


router.post('/',[auth,body('name','Name is required').notEmpty()],

async (req,res) => 

{

  const error = validationResult(req);

  if(!error.isEmpty())
  {
      return res.status(401).json({error:error.array()});
  }


  const {name,email,phone,type}  = req.body;

  try {

   let contact = new Contact 
    (
      {
          name,
          email,
          phone,
          type,
          user: req.user.id
      }

    );
  
     contact = await contact.save();

     res.json(contact);

      
  } catch (err) {

    console.log(err.message);

    res.status(500).send('Server error');
      
  }

});


router.put('/:id',auth,
async (req,res) => 
{

  const {name,email,phone,type} = req.body;

  const contactFields = {};

  if(name)
  {
    contactFields.name = name;
  }

  if(email)
  {
    contactFields.email = email;
  }

  if(phone)
  {
    contactFields.phone = phone;
  }

  if(type)
  {
    contactFields.type = type;
  }

  try {

    let contact = await Contact.findById(req.params.id);

    if(!contact)
    {
       return res.status(404).json({message:'contact not found'});
    }

    if(contact.user.toString() != req.user.id)
    {
      return res.status(401).json({msg:'Not authorized'});
    }

    contact = await Contact.findByIdAndUpdate(req.params.id,{$set:contactFields},{new:true});

    res.json(contact);
    
  } catch (err) {
    
    console.error(err.message);

    res.status(500).send('Server error');
  }

});


router.delete('/:id',auth,
async (req,res) => 
{
 
  try {

    let contact = await Contact.findById(req.params.id);

    if(!contact)
    {
       return res.status(404).json({message:'contact not found'});
    }

    if(contact.user.toString() != req.user.id)
    {
      return res.status(401).json({msg:'Not authorized'});
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({msg:'Contact removed'});
    
  } catch (err) {
    
    console.error(err.message);

    res.status(500).send('Server error');
  }

});


module.exports = router;