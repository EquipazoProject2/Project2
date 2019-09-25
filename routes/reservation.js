const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Meal = require("../models/Meal")
const axios = require('axios');

class ApiCocktail {
  constructor() {
    this.BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
  }

  getCocktails() {
    return axios.get(`${this.BASE_URL}`);
  }
}

const apiCocktails = new ApiCocktail();




router.post('/createReservation', (req, res) => {

  const people = req.body.people;
  const reservation_cuisine = req.body.reservation_cuisine;
  const reservation_date = req.body.reservation_date;
  const reservation_hour = req.body.reservation_hour;
  const table = req.body.table;

  const newReservation = new Reservation({
    client_email:req.user.email,
    people,
    reservation_cuisine,
    reservation_date,
    reservation_hour,
    table,
  });

  newReservation.save().then(() => {
    
    res.redirect(`/experience/${newReservation._id}`)
  })
})


router.get('/experience/:id', (req, res, next) => {
  apiCocktails.getCocktails()
    .then((cocktail) => {
      Reservation.findById(req.params.id).then((reservation)=>{
        
        Meal.find({ cuisine_type: reservation.reservation_cuisine }).then((meals)=>{
          
          res.render('restaurant/experience', { drinks: cocktail.data.drinks,meals,reservation })
        })
        
      })
      
    })
});


router.post('/experience/:id',(req,res,next)=>{
  console.log(req.body.meals)
  Reservation.findById(req.params.id).then((reservation) => {
    Meal.find({ cuisine_type: reservation.reservation_cuisine }).then((meals) => {
    let mealsArr= req.body.meals
    let totalMeals = []
      let totalDrinks = req.body.drinks.split(',')
   
      Object.values(meals).forEach((meal,idx)=>{
        for (let i = 0; i < +mealsArr[idx]; i++) {
          totalMeals.push(meal.name)
        }
      })

      console.log(totalMeals)
      console.log(totalDrinks)

      Reservation.findByIdAndUpdate(req.params.id, { $set: { meal: totalMeals } }, { new: true }).then(()=>{
        Reservation.findByIdAndUpdate(req.params.id, { $set: { cocktail: totalDrinks } }, { new: true }).then(()=>{
          console.log("ya")
        })
      })
    })
  })
})

module.exports = router;
