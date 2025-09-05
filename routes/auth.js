const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For hashing passwords
const User = require('../models/user'); // Import the User model



// Render the registration form
router.get('/register',(req,res)=>{
    res.render('register'); // Render the register.ejs file
});
router.post('/register',async(req,res)=>{
   try{
     const {username,password} = req.body;
    
    const existingUser = await User.findOne({username : username});
    if(existingUser){
        return res.status(400).send('Username already exists');
    }
    // Hash the password with a "salt round" of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser= new User({
        username: username,
        password: hashedPassword // Store the secure hash, not the original password
    });
    await newUser.save();
     // 4. Redirect to the login page
    res.redirect('/login');
   }
   catch(err){
    res.status(500).send('Server error during registration.');
   }
});