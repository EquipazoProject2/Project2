const express = require('express');
const router = express.Router();
const passport = require('passport');
const secure=require('../configs/middlewares')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/view',secure.checkLogin ,(req, res, next) => {
  
    res.render('restaurant/view',{user:req.user});
  
  
  
});

router.get('/info', (req, res, next) => {
  res.render('restaurant/info');
});


module.exports = router;
