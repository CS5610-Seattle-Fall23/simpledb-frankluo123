/**
 * index JavaScript
 * @author Frank Luo
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  // for await (const doc of MyModel.find()) {
  //   console.log(doc); 
  // }
  res.render('index', { title: 'Express' });
});


// router.get('/presidents', function(req, res, next) {
//   res.render('presidents', { title: 'Express' });
// });

// const mongoose = require('mongoose');
// const db = mongoose.connection;
// const Schema = mongoose.Schema;
// const mySchema = new Schema({ iceCream: String , fruit: String}, {collection: 'mycollection'});
// const MyModel = mongoose.model('mycollection', mySchema );

/**
* Sets up a route handler for POST requests
*/ 
router.post('/submitFoodPreferences', (req, res, next) => {
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
  // const data = new MyModel({ iceCream: req.body.iceCreamFlavor, fruit: req.body.favoriteFruit });
  // data.save((err) => { if (err) return handleError(err); })

  // For cookie and a thank you message for the POST request
  res.cookie('favoriteFruit', req.body.favoriteFruit, { maxAge: 900000, httpOnly: false });
  res.render('results', {favoriteFruit: req.body.favoriteFruit});
});

module.exports = router;