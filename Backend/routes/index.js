const express = require('express');
const router = express();

// Routes
router.use('/',function(req, res){
    res.send('Home Page');
})

module.exports=router;