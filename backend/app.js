const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => res.send('Home Route'));

const port = process.env.PORT || 8080;

mongoose
	.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(port, () => console.log(`Server and database running on ${port}, http://localhost:${port}`));
	})
	.catch((err) => {
		console.log(err);
	});
