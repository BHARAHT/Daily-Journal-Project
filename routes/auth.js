const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For hashing passwords
const User = require('../models/user'); // Import the User model

 

// Render the registration form
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

// Render the login form
// ## LOGIN ROUTE ##
router.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body;
         // 1. Find the user in the database
         const user= await User.findOne({username: username});
          if (!user) {
            return res.status(400).send('Invalid credentials.');
        }
         // 2. Compare the submitted password with the stored hash
         const isMatch =await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).send('Invalid credentials.');
            }

            // 3. If they match, log the user in by saving their ID to the session
            req.session.userId = user._id;
            // 4. Redirect to the main dashboard
            res.redirect('/dashboard');
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server error during login.');
    }
});

//logout session 
router.get('/logout',(req,res)=>{
    // 1. Destroy the session
    req.session.destroy(err=>{
        if(err){
            return res.redirect('/dashboard'); // If error, send back to dashboard
        }
    // 2. Clear the cookie and redirect to login
        res.clearCookie('connect.sid'); // The default session cookie name
        res.redirect('/login');
    });
});

module.exports = router;
