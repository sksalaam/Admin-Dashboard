const express = require('express');
const router = express.Router();    

const {register, login, authMiddleware, logout } = require('../../Controllers/Auth-controller');


router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);


router.get('/check-auth', authMiddleware, (req, res)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'User Authenticated',
        user,
       
    }); 
});


module.exports = router;