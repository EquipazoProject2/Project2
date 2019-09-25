const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/view', (req, res, next) => {
  res.render('restaurant/view');
});

router.get('/info', (req, res, next) => {
  res.render('restaurant/info');
});


module.exports = router;
