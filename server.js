const mongoose= require('mongoose');
mongoose.set('strictQuery', true);
const express= require('express')
const cors = require("cors");
const router=express.Router();
require ('dotenv').config()
const connectdb= require("./db")
const http = require('http');
const bodyParser = require('body-parser')
const app = express();
app.use(cors())

connectdb()

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json())
app.use('/api/user/data/', require('./routes/userRoutes'))


const port = process.env.PORT;
const server =app.listen(port, () => {
  console.log(`server started at :${port}`);
});

module.exports= {app,server}