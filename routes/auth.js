const express = require('express');
const {body,validationResult} = require('express-validator');
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth =  require('../middleware/auth');



const router = express.Router();


router.get('/',
auth,
async (req,res) =>
{
  
  try {


     const user = await User.findById(req.user.id).select('-password');

     res.json({user});


    
  } catch (err) {
    
    console.error(err.message);

    return res.status(500).send('Server error');
  }

});

router.post('/',
body('email','Please enter valid email').isEmail(),
body('password','Please enter password').exists(),
async (req,res) =>
{
   

 const error = validationResult(req);

 if(!error.isEmpty())
 {
     return res.status(400).json({error:error.array()});
 }

 const {email,password} = req.body;

 try 
 {

    let user = await User.findOne({email});

    if(!user)
    {
       return res.status(400).json({message:'Incorrect credentials'});
       
    }
  
  
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch)
    {

        return res.status(400).json({message:'Incorrect credentials'});
        
     
    }
  
    const payload = 
    {
        user : {

         id: user.id
         

        }
    };


    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},
    
    (err,token) => 
    {

      if(err)
      throw err

      res.json({token});

    });

     
 } catch (error)
  {
 
  
    console.error(error);
    return res.status(500).send('Server error');
     
 }
 


  
 
  



});


module.exports = router;