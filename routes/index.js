const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/view', (req, res, next) => {
  if (req.session.user){
    res.render('restaurant/view');
  }
  else{
    res.redirect('/auth/login')
  }
  
});


module.exports = router;
