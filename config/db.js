const mongoose = require ('mongoose')
const colors = require('colors')
//func mongodb conn
 const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to DB ${mongoose.connection.host}`.bgCyan)
    } catch (error) {
        console.log('DB error',error)
    }
}

module.exports = connectDB;