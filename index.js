const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const movieRoute = require('./routes/movieRoute');
const actorRoute = require('./routes/actorRoute');
const producerRoute = require('./routes/producerRoute');
const databaseConnection = require('./database');
const app = express();

databaseConnection();
app.use(bodyparser.json());
app.use(cors());
app.use('/movies', movieRoute);
app.use('/actors', actorRoute);
app.use('/producers', producerRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server Running ${port}`);
});
