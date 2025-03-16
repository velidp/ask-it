<div id="top"></div>

<br />
<div align="center">
  <a>
    <img src="https://raw.githubusercontent.com/velidp/ask-it/master/client/public/icon.ico" alt="Logo" width="80" height="80">
  <a/>

  <h2 align="center">Ask It</h2>

  <p>
    An awesome web app!
    <br />
    <a></a>
    <br />
    <br />
    ·
    <a target="_blank" href="https://github.com/velidp/ask-it/issues">Report Bug</a>
    ·
    <a target="_blank" href="https://ask-it-mop.netlify.app/">Deployment</a>
  </p>
</div>

<hr/>


#### App is live at:  https://ask-it-mop.netlify.app/


### Built With

* [PostgreSQL](https://www.postgresql.org/)
* [Express](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/en/)

The frontend was developed using the React.  <a href="https://mui.com/">Material-UI</a> library and CSS were used for the layout of the application.
<a href="https://redux.js.org/">Redux</a> and <a href="https://www.npmjs.com/package/axios">Axios</a> were also used on the frontend.
All data is stored in the PostgreSQL database. The passwords of the created users are hashed using the bycritp library. 
Backend was developed using Node.js. 
The following libraries were used to develop the backend: express, cors, dotenv... 
The backend is deplolayed on <a href="https://www.heroku.com/">Heroku</a> and the frontend on <a href="https://www.netlify.com/">Netlify</a>. 



## Getting Started

### Installing dependencies and developing locally

```
# Clone this repository
git clone https://github.com/velidp/ask-it.git
```

#### Run frontend
```
# Move to the project frontend folder
cd client

# in src/api/index.js file change API from heroku to http://localhost: + PORT on which backend will run

# install dependencies
npm install

# start local development server and watch for changes
npm start
```
  
#### Create db.js file with database credentials:
```
const Pool = require('pg').Pool;

const pool = new Pool({

      user: '',
      host: '',
      database: '',
      password: '',
      

    connectionString: '',
    ssl: {
      rejectUnauthorized: false
    }
  });

module.exports = pool;

```
  

#### Run backend
```
# In another terminal
# Move to the project backend folder
cd server


# install dependencies
npm install

# start local development server and watch for changes
npm start

```


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

[@LinkedIn](https://www.linkedin.com/in/velid-posko/) 
<br/>
velid.sm@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>


