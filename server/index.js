const express = require('express');
const cors = require('cors');

const questionRoutes = require('./routes/questionRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const answerRoutes = require('./routes/answerRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ask It Server');
});


app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })


app.use('/questions', questionRoutes);
app.use('/user', userRoutes);
app.use('/answer', answerRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is listening on: ' + PORT);
});