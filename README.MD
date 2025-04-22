# H1 - How to start the application
   * Clone The application.
   * cd into the application folder.
   * copy the data from .env.example to your .env file
   * run `npm install`.
   * after installing the dependencies run `npm run db:create`: This command helps create the postgreSQL database in your already running postgreSQL database server.
   * after creating the database run `npm run migrate`: This command helps migrate the categories table schema to your database.
   * run `npm start`
## H2 - I have attached the Postman API documentation in the mail, kindly open the API documentation to test all required endpoints.
   * To test the application using the code via unit testing, kindy updated the test data on the /tests/api.test.ts file to leverage what you have on the database 

