const express = require('express');
const {body,validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

router.post('/',
body('name','Please enter name').notEmpty(),
body('email','Please include valid email').isEmail(),
body('password','Please enter password with atleast 6 characters').isLength({min:6}),
 async (req,res) =>
{

 const errors = validationResult(req);

 if(!errors.isEmpty())
 {
    
    return res.status(400).json({errors:errors.array()});
 }

 
 const {name,email,password} = req.body;

 try {


  let user = await User.findOne({email});

  if(user)
  {
      return res.status(400).json({msg:'User already exist with above email'});
  }

  user = new User ({
 
  name,
  email,
  password

  });

  const salt = await bcrypt.genSalt(10);
 
  user.password = await bcrypt.hash(password,salt);

  await user.save();

  const payload = {

   user : {

      id: user.id
   }

  }

  jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},
  (err,token) => 
  {

   if(err)
   throw err;

   res.json({token});

  });



     
 } catch (error) {

    console.error(error.message);

    return res.status(500).send('Server error');
     
 }


});


module.exports = router;
