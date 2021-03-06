'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const portfolioRoutes = require('./routes/portfolio')

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', portfolioRoutes.routes);

app.listen(process.env.PORT || config.port, () => console.log(`App is running on url http://localhost:${process.env.PORT}`));
