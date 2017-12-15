# 4Pet
This is the university project developed during the second half of 2017

The idea was to build an eCommerce that worked as an intermediate between specialized/certificated pet sellers and customers.

The front-end is mainly developed in React+Redux and the back-end (separated repo) is developed in Ruby on Rails.

# Demo
https://youtu.be/uWr1LsSP4TE

* The server was hosted on Heroku
* The home page shows up results based on the user's location (matching specialized sellers inputed delivery range)
* Swagger was used to document the APIs
* The APIs follow the REST API principles
* The application uses MySQL and MongoDB as databases
* ESLint is used to identify and report patterns in .js code
* sass is used to style the components
* Webpack hot module replacement is used for instant page refresh during development
* HOC is used to protect some pages from unlogged users
* Pull requests weren't used because of the simplicity of the project and amount of collaborators working of each part of the project.

#### Installation
`npm install`
(node version is specified in .nvmrc)
#### Run dev env
(works with hot module replacement)
`npm start`
#### Run prod env
(subject to eslint)
`npm run build`

Open `localhost:8080` to open the app!

Swagger API Doc: http://four-pet.herokuapp.com/api/documentation/

Credits to https://github.com/arshdkhn1/ecommerce-site-template for the base template and webpack envinroment.
