const express = require('express');
const router = express.Router();

router.get('/experience', (req, res, next) => {
  res.render('restaurant/experience');
});

module.exports = router;