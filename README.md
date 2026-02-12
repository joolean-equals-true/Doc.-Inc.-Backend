# Doc. Inc. Backend
This is the backend for Doc. Inc, which features tables for businesses, documents, users, emails, logging, and accounts (as well as a few other specific tables) using Sequelize as the ORM.
To run this backend, simply clone the repository with git clone.

## Installation
From this repostiory, copy the github link and run 
git clone <http repository link>

You should clone all the files, without any node modules. Next, run npm install to retreive all the necessary node modules. lastly, create an .env file outside all other folders (same level as this README.md file). This file will hold the database host, password of the database, the user for that password, and the name of the database you will be performing operations on in this format:


DB_HOST = "localhost"
DB_PW = "password"
DB_USER = "root"
DB_NAME = "Doc.Inc"

lastly, in MySql, if you have a server instance running, make sure to have a database created with the same name you listed in DB_NAME, or the server will fail to run. 

In the terminal, you can type node server.js to run this server, or run server.js in another way that you are comfortable with. 

### Routes
The specified routes are here for you to use, to request any data from doc inc that you might like to use for your own purposes.
* /users
* /businesses
* /business_accounts
* /business_divisions
* /loggings
* /emails
* /account_links
* /documents
* /client_memberships
* /recipients

Each of these routes have get, put, post, and delete methods for the tables.
Any tables with foreign keys will have default values set to null, if you want to change the order of which you create a table. Foreign keys can only be set to a table that already exists, otherwise the post or put operation will fail. You can interact with a specific item by writing "/:id" over the route and selecting the path variable in postman. Here is the full, base route:
/http://localhost:<server_port>/doc.inc