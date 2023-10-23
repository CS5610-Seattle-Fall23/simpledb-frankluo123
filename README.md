[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12534331&assignment_repo_type=AssignmentRepo)
# SimpleDB 💽🌐💾🛢️🌎🖧⚡

You will utilize MongoDB and Express to create a simple web form that reads from and updates a database

## Part 1 - Instructions

You will have to create this program from scratch.

0. Have express and express-generator installed. See [mozilla tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment).
1. Run `npm install pug -g`
2. Run `express --view=pug` followed by `npm install`.
3. Edit [views/index.pug](views/index.pug) so that it creates the same form you used in SimpleForm. For more about how Pug (formerly Jade) works, visit [https://pugjs.org/](https://pugjs.org/). Here is some example code to get you started:

```pug
block content
  #myform
  h1 Personality Quiz
    form(action="/myaction" method="post")
      fieldset
        label(for="color") Favorite Color:
        input(type="text" id="color" name="color")
        label(for="mynumber") Favorite Number:
        input(type="number" id="mynumber" name="mynumber")
        input(type="submit" value="Complete Quiz")
```

4. Add a favicon and reference it in [views/layout.pug](views/layout.pug). The image is completely up to you. Visit [https://favicon.io/](https://favicon.io/) for a generator.
5. Add some style to your index using CSS and make sure it is being referenced in [views/layout.pug](views/layout.pug). This can be the same from the previous assignment. Feel free to visit [http://www.oswd.org/](http://www.oswd.org/) for inspiration, but also cite and attribute any design you use that is not your own.
6. Process the a post request the same way you did for SimpleForm, for now, except have it re-render the index file like in the example shown below:

```javascript
router.post('/myaction', function(req, res, next) {
  console.log(req.body.color);
  console.log(req.body.mynumber);
  res.render('results', { title: 'Personality Quiz Results', personality: "You like pizza" });
});
```

Notice it is pointing to a `results` file. You'll need to make [views/results.pug](views/results.pug). Here's what it could look like:

```pug
extends layout

block content
  h1=title
  h1=personality
```

7. Visit Mozilla's tutorial regarding `mongoose` and `MongoDB` [here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose).
8. Create a MongoDB account and try the free version of MongoDB Atlas (https://www.mongodb.com/atlas)[https://www.mongodb.com/atlas]. You can create a local database and do your development there, but since you'll be creating an account on mongodb anyway it is ok to just use the remote database.
9. Create a free cluster then a database and collection, for example `mydatabase` and `mycollection`. Then add a connection from anywhere and a username and password of your choosing. Finally, include the following code (or something similar) in your [app.js](app.js) file.

```javascript
//Import the mongoose module
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://<username>:<password>@cluster0.9xpc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

but replace `<username>`, `<password>`, and `myFirstDatabase` with the ones you used.

If you run `npm install` and `npm start` you should not get any connection errors. In fact, if you look at your database deployments on Atlas you should see your new connection logged.

10. Include the following near the beginning of the [routes/index.js](routes/index.js):

```javascript
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
const mySchema = new Schema({ color: String , mynumber: Number}, {collection: 'mycollection'});
const MyModel = mongoose.model('mycollection', mySchema );
```

This will use the connection that you created in `app.js` and specify the collection that you are using. If you're using a different name for the collection, now is the time to specify that. Then update the post route to save to the database using what the user entered.

```javascript
const data = new MyModel({ color: req.body.color, mynumber: req.body.mynumber });
data.save((err) => { if (err) return handleError(err); });
```

Try running the app at this point and submit a form. Then check the database and you should see it update with the new data.

11. Now alter the get request to read from the connection:

```javascript
router.get('/', async function(req, res, next) {
  for await (const doc of MyModel.find()) {
    console.log(doc); 
  }
  res.render('index', { title: 'Personality Quiz' });
});
```

  At this point if you load your app, the console should output the contents of the database.

12. Instead of printing to the console, alter the view to display the content of the database.
13. If you were using a local version of the database switch to one on Atlas and verify that it still works. Then deploy your app to Google Cloud.

**Regarding Testing**
The usual way to test database methods would be to have a local dev version specifically for testing that you can drop and re-create in a controlled way. This assignment tried to keep things simple, and didn't have you create specific modules and methods for handling the database connections. Therefore any testing you add will appear no different than SimpleForm. As such, use the same tests from SimpleForm to ensure they still work. You may wish to add special test-case handling in the post route, to avoid the test being saved to the database; or reset the mongoose connection in the test to point to a different collection than the one online.

Be sure that you have:
* Validated your html (at least the one it generates) and have included metadata like in previous assignments.
* Finished the [routes/index.js](routes/index.js) file to perform the necessary functions.
* Modified the documentation in the program's comments (for the files you edited) to describe the changes you made. Verify that you are well documenting your code using [JSDoc](https://www.npmjs.com/package/jsdoc) standards. You do not need to generate an API.
* Ensured that you write satisfactory unit tests and that your code passes them, with **75%** coverage, but the code you wrote needs to be completely covered.

## Part 2 - Reflection
Update the README to answer the following questions:

 1. Add screenshots showing your app running on Google Cloud. Add a link to your website. Add a screenshot showing the html on your website has been validated. Also one showing proper contrast.
 2. Add screenshots showing your Atlas database before and after your app runs.
 3. Pug/Jade is not the only template engine. Another popular one is EJS. Look into EJS and describe & compare it to Pug. Cite at least two sources.
 4. Why is it convenient to use Mongo with Node.js?
 5. In your own words what is BSON and why is it used with Mongo instead of JSON? Cite any sources.

 ---
## Running Tests Locally
 Packages used for testing:
 * `jest`
 * `supertest` [link](https://www.npmjs.com/package/supertest)
 
All of these packages should theoretically (🤞) be installed with the following command:
```bash
sudo npm install -g --save-dev jest supertest
```
Afterwards it is sometimes necessary to run the command:
```bash
npm install
```
Run the server by using the command
```bash
node server.js
```

Then hypothetically the tests *should* run with the command:
```bash
npm test
```
or
```bash
jest --runInBand --detectOpenHandles --coverage
```