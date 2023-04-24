const mongoose = require('mongoose');
const express = require("express");

const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config.js');
var fs = require('fs');
const ObjectId= require('mongoose').Types.ObjectId

const PORT = process.env.PORT || 8080;

let Contact = require("./models/contactModel");

let dummyDataFile;
if(fs.existsSync('./dummyDataFile.json')){
	dummyDataFile = require('./dummyDataFile.json');
}




const { equal } = require('assert');
let contactsDB;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.set("view engine", "ejs");

function serveScript(req, res, next){
  res.writeHead(200, { 'content-type': 'application/javascript' });
  fs.createReadStream("./views/pages/client.js").pipe(res);
  }
  app.use('/client.js', serveScript);
  app.use('/contacts/client.js', serveScript);
  app.use('contacts/:contactId/client.js', serveScript);



//get all contacts
app.get('/', respondContacts);
function respondContacts(req, res, next){

	//sends this if requesting json data
	let idObject = {contacts: []};
	//sends this if requesting html data
	let idAndNameArray = [];

	Contact.find({}, function (err, data) {
		console.log(data)
		for(let i = 0; i < data.length; i++) {
			//creates an object with respecitve properties
			let clicked_contact = {}
			clicked_contact.id = data[i].id;
			clicked_contact.fName = data[i].fName;
			clicked_contact.lName = data[i].lName;
			clicked_contact.email = data[i].email;
			clicked_contact.phone = data[i].phone;
			clicked_contact.imageUrl = data[i].imageUrl;
	
			//appends this object to idAndNameArray
			idAndNameArray.push(clicked_contact);
	
			//appends id to idArray
			idObject.contacts.push(data[i].id);
		}

		res.format({
			"application/json": () => {res.status(200).json(idAndNameArray)},
			"text/html": () => {res.render("pages/index", {contacts: idAndNameArray})}
		});

	});

	
}





//gets just the contact with given id
app.get("/contacts/:contactID", getContact, sendSingleContact);
function getContact(req, res, next){

	let id = req.params.contactID;
	
	Contact.findOne({ id: id}, function (err, result) {

		if(!result){
			res.status(404).send("Could not find contact.");
		}
		else{
			if (err){
				console.log(err);
			}
			else{
				res.contact = result
				next();
			}
		}
	});
}
//Sends either JSON or HTML
function sendSingleContact(req, res, next){
	res.format({
		"application/json": () => { res.status(200).json(res.contact); },
		"text/html": () => { res.render("pages/contact", {contact: res.contact}); }
	});
	next();
}



app.get("/addContact", addContactPage);
function addContactPage(req, res, next){
	res.format({
		"text/html": () => { res.render("pages/addcontact"); }
	});
	next();
}
app.post('/addContact', (req, res) => {
	const user = new Contact({
	  fName: req.body.fName,
	  lName: req.body.lName,
	  email: req.body.email,
	  phone: req.body.phone,
	  imageUrl: req.body.imageUrl
	});
  
	user.save()
	  .then(() => {
		res.send('User created successfully');
	  })
	  .catch((error) => {
		console.error(error);
		res.status(500).send('Error creating contact');
	  });
  });

//deletes a contact
app.delete('/deleteContact/:contactID', (req, res) => {
	const id = req.params.contactID;
	Contact.findByIdAndDelete(id, (err, doc) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Internal server error');
	  } else if (!doc) {
		res.status(404).send('Not found');
	  } else {
		res.status(204).send("Successfully deleted");
	  }
	});
  });


  app.put('/updateContact/:contactID', (req, res) => {
	const id = req.params.contactID;
	Contact.findByIdAndUpdate(id, req.body, { new: true }, (err, doc) => {
	  if (err) {
		console.error(err);
		res.status(500).send('Internal server error');
	  } else if (!doc) {
		res.status(404).send('Not found');
	  } else {
		res.status(200).json(doc);
	  }
	});
  });




  //Start the connection to the database
mongoose.connect(config.db.host, {useNewUrlParser: true, useUnifiedTopology: true});

// Get the default Mongoose connection (can then be shared across multiple files)
contactsDB = mongoose.connection;

contactsDB.on('error', console.error.bind(console, 'connection error:'));
contactsDB.once('open', function() {
  //We're connected
  console.log("Connected to the database...");

  if(dummyDataFile){

	// Intialize the contacts collection in the database by using the data in the file: students.json
	Contact.find({}, function (err, result){
		if(err){console.log(err);}
		else{
		console.log("Result :", result);
		if(result.length === 0){
			console.log("Intializing the contacts collection...");
			contact.insertMany(dummyDataFile, function(err, result){
			if(err){console.log(err);return;}
			console.log(result);
			app.listen(PORT, ()=> {
				console.log(`Server listening on http://localhost:${PORT}`)
				});
			});
		}
		else{
			app.listen(PORT, ()=> {
			console.log(`Server listening on http://localhost:${PORT}`)
			});
		}
		}
	});

	}
});

  // terminates a connection to the database when the node application finishes
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
	  console.log("Mongoose disconnected through app termination");
	  process.exit(0);
	});
  });
  app.listen(PORT, ()=> {
	console.log(`Server listening on http://localhost:${PORT}`)
	});