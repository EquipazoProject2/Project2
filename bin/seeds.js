require('dotenv').config();
const mongoose = require("mongoose");
const Meal = require("../models/Meal");

const meals = [
  {
    name: 'Couscous prawn salad',
    description: 'with avocado, rocket and pan seared prawn with lime and ginger',
    cuisine_type: 'Arabic',
    price: 80,
  },
  {
    name: 'I Falafel You',
    description: 'Platter of mix salad served with falafel, avocado, carrot, roasted corn, tomato, tzatziki dressing and hummus pita bread',
    cuisine_type: 'Arabic',
    price: 100,
  },
  {
    name: 'Saffron and lemon chicken Tagine',
    description: 'With olives served with warm pita bread and selection of salads',
    cuisine_type: 'Arabic',
    price: 110,
  },
  {
    name: 'Beef kebab skewer',
    description: 'Served with warm pita bread, Chekchouka paste, rosemary French fries and garlic mustard mayonnaise',
    cuisine_type: 'Arabic',
    price: 95,
  },
  {
    name: 'Vegetarian Kebab of Chickpeas and mix of dry pulses',
    description: 'Served with warm pita bread, Chekchouka paste, rosemary French fries and garlic mustard mayonnaise',
    cuisine_type: 'Arabic',
    price: 80,
  },
  {
    name: 'Lamb tagine',
    description: 'Cooked in Mediterranean spices served with bread, selection of vegetables and side salads',
    cuisine_type: 'Arabic',
    price: 95,
  },
  {
    name: 'Kibbeh',
    description: 'Lebanon’s National Dish is calling your name, tempting you to crunch into its crazy delicious fried exterior to let those sautéed pine nuts and spicy minced meat waken up your tongue.',
    cuisine_type: 'Lebanese',
    price: 75,
  },
  {
    name: 'Kafta',
    description: 'The kafta is a happy little lamb, beef or chicken meatball, filled with onion, parsley, breadcrumbs and spices. These guys are barbecued on skewers or served in a gravy',
    cuisine_type: 'Lebanese',
    price: 90,
  },
  {
    name: 'Rice Pilaf',
    description: 'Rice with fried vermicelli noodles.',
    cuisine_type: 'Lebanese',
    price: 75,
  },
  {
    name: 'Fattoush',
    description: 'Typicall salad with crispy lettuce, bread and veggies.',
    cuisine_type: 'Lebanese',
    price: 70,
  },
  {
    name: 'Tabbouleh',
    description: 'arsley, mint, tomatoes and a bunch of other yummy stuff come together to make this die-hard side dish.',
    cuisine_type: 'Lebanese',
    price: 85,
  },
  {
    name: 'Sfeeha',
    description: 'Lebanon typicall pie',
    cuisine_type: 'Lebanese',
    price: 90,
  },
  {
    name: 'Gyu Miso Yaki (牛味iso焼き)',
    description: 'Shell steak beef marinated in miso and grilled with a side of broccoli.Served with a bowl of rice.',
    cuisine_type: 'Japanese',
    price: 140,
  },
  {
    name: 'Buri Teriyaki (ブリ照り焼き)',
    description: 'Grilled yellowtail with teriyaki sauce and a side of shiitake.Served with a bowl of rice.',
    cuisine_type: 'Japanese',
    price: 160,
  },
  {
    name: 'Kushi Katsu (くしかつ)',
    description: 'Deep-fried skewered pork and onions with shredded cabbage, broccoli, lemon, and tonkatsu sauce.Served with abowl of rice',
    cuisine_type: 'Japanese',
    price: 110,
  },
  {
    name: 'Sushi Otoro (大トロ (本まぐろ)',
    description: 'Fatty Tuna of Bluefin Tuna',
    cuisine_type: 'Japanese',
    price: 200,
  },
  {
    name: 'Sushi Chutoro (中トロ(本まぐろ)',
    description: 'Medium Fatty Tuna of Bluefin Tuna',
    cuisine_type: 'Japanese',
    price: 190,
  },
  {
    name: 'Sushi Bincho Maguro (びんちょうまぐろ)',
    description: 'Albacore Tuna',
    cuisine_type: 'Japanese',
    price: 170,
  },
  {
    name: 'Alu Gobi',
    description: 'Alu Gobi is a dry dish made with potatoes (aloo), cauliflower (gobi) and Indian spices.',
    cuisine_type: 'Indian',
    price: 90,
  },
  {
    name: 'Rogan Josh',
    description: 'Braised lamb chunks cooked with a gravy based on browned onions or shallots, yogurt, garlic, ginger and aromatic spices (cloves, bay leaves, cardamom and cinnamon). ',
    cuisine_type: 'Indian',
    price: 110,
  },
  {
    name: 'Samosas',
    description: 'Samosas are a fried or baked pastry with savoury filling, such as spiced potatoes, onions, peas, lentils and sometimes ground lamb, ground beef or ground chicken.',
    cuisine_type: 'Indian',
    price: 95,
  },
  {
    name: 'Tandoori Chicken',
    description: 'Tandoori chicken a popular North Indian dish consisting of roasted chicken prepared with yogurt and spices. ',
    cuisine_type: 'Indian',
    price: 100,
  },
  {
    name: 'Malai Kofta',
    description: 'Malai Kofta is a tasty vegetarian alternative. Restaurant style malai kofta is cooked in a creamy gravy made of tomatoes and cashew nuts.',
    cuisine_type: 'Indian',
    price: 90,
  },
  {
    name: 'Butter Chicken',
    description: 'Butter chicken is traditionally cooked in a tandoor; but may be grilled, roasted or pan-fried in less authentic preparations.',
    cuisine_type: 'Indian',
    price: 120,
  },
  {
    name: 'White Fish Ceviche',
    description: 'With tiger milk',
    cuisine_type: 'Peruvian',
    price: 130,
  },
  {
    name: 'Lomo Saltado',
    description: 'Beef stir-fried with tomatoes and onions and then served with rice and French fries.',
    cuisine_type: 'Peruvian',
    price: 180,
  },
  {
    name: 'Aji de Gallina',
    description: 'Shredded chicken smothered in a sauce made of walnuts, cheese, and milk. ',
    cuisine_type: 'Peruvian',
    price: 150,
  },
  {
    name: 'Cuy',
    description: 'In traditional Peruvian cuisine, the entire animal is stuffed with local herbs, roasted over an open wood fire, and served with potatoes.',
    cuisine_type: 'Peruvian',
    price: 130,
  },
  {
    name: 'Rocoto Relleno',
    description: 'Peru’s version of a stuffed pepper, Rocoto Relleno comes with a signature taste: a spicy kick and a whole lot of bold flavor!',
    cuisine_type: 'Peruvian',
    price: 90,
  },
  {
    name: 'Causa',
    description: 'It begins with meaty, yellow mashed Peruvian potatoes blended with oil, lime, and a spicy aji amarillo sauce.',
    cuisine_type: 'Peruvian',
    price: 60,
  },
]

Meal.deleteMany()
  .then(() => {
    return Meal.create(meals);
  }).then(() => {
    mongoose.disconnect()
  }).catch(err => {
    mongoose.disconnect()
    throw err;
  })

require('../configs/db.config');



