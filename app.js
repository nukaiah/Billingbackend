const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();



const uri = 'mongodb+srv://nagendra:nag123@cluster0.nhndxbf.mongodb.net/Dosthi?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log('Mongoose connected to MongoDB');
  })
  .catch((error) => {
    console.error('Mongoose connection error:', error);
  });


  app.use(cors({
    origin: '*', // Replace '*' with your Flutter web app's domain in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  // Middleware to handle preflight requests for all routes
  app.options('*', cors());
  
  

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
  
const merchantController = require('./MVC/Controllers/MerchantController');
app.use('/api/merchant',merchantController);

const categoryController = require('./MVC/Controllers/CategoryController');
app.use('/api/category',categoryController);

const itemController = require('./MVC/Controllers/ItemsController');
app.use('/api/item',itemController);

const orderController = require('./MVC/Controllers/OrdersController');
app.use('/api/order',orderController);


module.exports = app;