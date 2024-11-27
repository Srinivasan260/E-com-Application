const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/practicedb').then(()=>console.log('database connected')).catch(()=>console.log('notconnected'))