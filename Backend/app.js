const express = require('express');
const app = express();
const cookieParser=require('cookie-parser');
const path=require('path');
const db=require('./config/mongoose-connection');

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

