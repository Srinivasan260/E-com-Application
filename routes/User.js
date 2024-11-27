const express = require('express');

const jwt = require('jsonwebtoken')

const router = express.Router()

require('dotenv').config();


const Signup = require('../modules/schemas/singup')

const { hasPass, logPas } = require('../modules/hasing')






router.post('/signup',async(req,res)=>{

    const { username, password } = req.body;

    if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await Signup.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: "Username already exists" });
        }
  


    const haspassword = hasPass(password)
    const Newuser = new Signup({username :username,password:haspassword})
    const Newuserdata = await Newuser.save()
    console.log(Newuserdata)
    res.send(Newuserdata)

    }catch(err){
        console.error(err);
       res.status(500).json({ error: "Internal server error" });

    }

})


router.post('/login',async(req,res)=>{

    console.log(req.body)

    if(req.body.username && req.body.password){

        const username = req.body.username

        const data = await Signup.findOne({username})

        const password = logPas(req.body.password,data.password)
        console.log(password)

        if(data && password){
            const user = req.body.username
            console.log(user)
            console.log(process.env.ACCESS_TOKEN)
            const token = jwt.sign({username :user},process.env.ACCESS_TOKEN,{ expiresIn: '1h' })
            res.send(token)
        }
        
       


    }

})




router.delete('/delete/:username', async (req, res) => {
    console.log('hi')
    console.log(req.params.username)

    const user = await Signup.deleteOne({ username: req.params.username })
    if (user) return res.send("User deleted successfully")
    return res.send("user is not found")

})



router.put('/update/:id',async(req,res)=>{

    console.log(req.params.id)

    let data = await User.updateOne({userId:req.params. id},{$set:{ name:req.body.name,age:req.body.age,userId:req.params.userId}})
     res.send(data)

})


module.exports = router