/**
 * index JavaScript
 * @author Frank Luo
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let docsArray = [];
  try {
      for await (const doc of MyModel.find()) {
          console.log(doc);  // Logging each document to the console
          docsArray.push(doc);
      }
  } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      return next(error);
  }
  console.log('Docs Array:', docsArray);  // Logging the final array to the console
  res.render('index', { title: 'Express', docs: docsArray });
});



// For mongoose management 
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
const mySchema = new Schema({ iceCream: String, pizza: String, fruit: String, cuisine: String, spiciness: Number}, {collection: 'mycollection'});
const MyModel = mongoose.model('mycollection', mySchema );

/**
* Sets up a route handler for POST requests
*/ 
router.post('/submitFoodPreferences', async (req, res, next) => {
  // Forms data
  const iceCreamFlavor = req.body.iceCreamFlavor;
  const pizzaToppings = req.body.pizzaToppings;
  const favoriteFruit = req.body.favoriteFruit;
  const cuisine = req.body.cuisine;
  const spiciness = req.body.spiciness;

  // Checks if any food elements are missing
  if (!iceCreamFlavor || !pizzaToppings || !favoriteFruit || !cuisine || !spiciness) {
      res.status(422).send("Incomplete data!.");
      return;
  }

  // Debugging purposes
  console.log(req.body.iceCreamFlavor);
  console.log(req.body.pizzaToppings);
  console.log(req.body.favoriteFruit);
  console.log(req.body.cuisine);
  console.log(req.body.spiciness);

  // For error handling 
  try {
    const data = new MyModel({ iceCream: iceCreamFlavor, pizza: pizzaToppings, fruit: favoriteFruit, cuisine: cuisine, spiciness: spiciness });
    await data.save();
  } catch (err) {
    return handleError(err);
  }

  // For cookie and a thank you message for the POST request
  res.cookie('favoriteFruit', req.body.favoriteFruit, { maxAge: 900000, httpOnly: false });
  res.render('results', {favoriteFruit: req.body.favoriteFruit});
});

module.exports = router;