HOW TO RUN:

After downloading the file, 

Create a mongoDB atlas account, this will store the database

After registering and creating a database, go into the "config.js" file and replace the properties to match your configuration.


open terminal/cmdline in the main directory and run 
"npm install" to install all the dependencies 
"node server.js" to run the server

Then go into the "front-end" folder and run
"npm install" to install all the dependencies 
"npm start" to run the reactJS app 


Tech stack:

Back-end:
I used mongoDB and Mongooses as the database
I Used Node.JS and ExpressJS to creat the restful-api

Front-end:
 I used reactJS. Tried to used bootstrap and Jquery to create the sorting and searching for the table but could not complete.

How it works:
CRUD:
When the site is first started, a get request is called to get all the contact objects using the express server (endpoint is "/") and the ContactTable is populated with them.
If add or update, for any contact item, is clicked the ContactForm is shown and the data submitted in the form will go to the post method with endpoint "/addContact" if add was clicked which creates a new contact object and saves in the db or put method with endpoint "/updateContact/:contactID" else which will update the contact object with the matching contactID with this data.
If the delete button is clicked for any of the contact items, a delete request will be sent with the id of the item to the express server with endpoint /deleteContact/:contactID which will delete the contact object with this given id


Validation:
Whenever the "save changes" button is clicked validation will occur before saving. I have made it so the first and last name can only be letters, the phone can can only be in one of the formats:
123-456-7890
(123) 456-7890
123 456 7890
123.456.7890
+91 (123) 456-7890

And the email must be in the form of username@anemailprovider.something

All fields must also be filled, none can be blank






