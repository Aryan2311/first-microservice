import express from 'express';
import dotenv from 'dotenv';
import DBConnection from './database/dbconnection.js';
import customerApi from './api/customer_api.js';
import ProductApi from './api/Product_api.js';
import errorhandler from './errorHandler.js';
dotenv.config({path: './.env'});
const app = express();

DBConnection();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to Home Route!!');
});
app.use('/customer', customerApi);
app.use('/product', ProductApi);


app.use(errorhandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});