const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const adminRoute = require('./routes/admin');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './src/pages');

app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(`${__dirname}/public`)));

app.use('/', adminRoute);

const port = process.env.PORT || 8080;

mongoose
	.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(port, () => console.log(`Server and database running on ${port}, http://localhost:${port}`));
	})
	.catch((err) => {
		console.log(err);
	});
