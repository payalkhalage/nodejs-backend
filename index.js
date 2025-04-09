const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User.js')

const server = express()
server.use(cors())
server.use(bodyParser.json())


mongoose.connect('mongodb+srv://payal:Payal%400403@leadsoft.uwjlhau.mongodb.net/?retryWrites=true&w=majority&appName=leadSoft').then(() =>
    console.log("Database Connected..")
).catch((err) =>
    console.log(err)
)

server.post('/register', async (req, res) => {
    try {
        const { fullName, userName, age, password } = req.body
        const userExit = await User.findOne({ userName })
        if (userExit) {
            return res.json({
                status: false,
                message: 'User already exit'
            })
        }
        const userObj = new User({ fullName, userName, age, password })
        await userObj.save()

        res.json({
            status: true,
            message: "User registered Successfully..!!"

        })
    } catch (error) {
        res.json({
            status: false,
            message: `Error:${error}`
        })
    }
})


server.post('/login',async(req,res)=>{
    try{
        const{userName,password}=req.body
        const userExit=await User.findOne({userName})
        if(!userExit){
            return res.json({
                status:false,
                message:"User Not Found..!!"
            })
        }
        if(password !== userExit.password){
            return res.json({
                status:false,
                message:"Password is Incorrect..!!"
            })
        }
        res.json({
            status:true,
            message:"Login Successfully..!!"
        })

    }catch(error){
        res.json({
            status:false,
            message:`Error:${error}`
        })
    }
})
server.listen(8055, () => {
    console.log("Server started listining on port 8055");
})