const express = require ('express')
const colors = require ('colors')
const cors = require ('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')


//dot env config
dotenv.config();

//Db conn
connectDB();

//rest object
const app = express()

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//route
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth',require("./routes/authRoutes"));
app.use('/api/v1/user',require("./routes/userRoutes"));


app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Welcome server</h1>");
});
//PORT
const PORT = process.env.PORT || 8080

//listem
app.listen(PORT,() =>{
    console.log(`server running on ${PORT}`.bgBlue.white);
});