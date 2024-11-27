const express = require('express');


const  ComplaintsRoutes = require('./routes/Complaint')
const  Feebbackroutes = require('./routes/feedback')
const  Product   = require('./routes/Product')
const  User = require('./routes/User')

const app = express()

require('./modules/dbcon')

// const mongoose = require('mongoose')

// mongoose.connect('mongodb://0.0.0.0:27017/practicedb').then(()=>console.log('database connected')).catch(()=>console.log('notconnected'))




app.use(express.json())

app.use('/api/product',Product)


app.use('/api/auth',User)

app.use('/api/feedback',Feebbackroutes)

app.use('/api/Complaint',ComplaintsRoutes)








app.listen(3000, () => {
    console.log("running in the port ")
})