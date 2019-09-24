const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

router.post('/createReservation',(req,res)=>{

  const people = req.body.people;
  const reservation_cuisine = req.body.reservation_cuisine;
  const reservation_date = req.body.reservation_date;
  const reservation_hour = req.body.reservation_hour;
  const table = req.body.table;
  
  const newReservation = new Reservation({
    people,
    reservation_cuisine,
    reservation_date,
    reservation_hour,
    table,
  });

  newReservation.save().then(()=>{
    res.redirect("/experience")
  })
})


router.get('/experience', (req, res, next) => {
  res.render('restaurant/experience');
});

module.exports = router;