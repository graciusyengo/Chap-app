const express=require ('express')
const app= express()
const cors= require("cors")
const mongoose= require('mongoose')
const morgan= require('morgan')
const dotenv= require('dotenv')
const helmet=require('helmet')
const userRoute= require('./routes/users')
const authRoute= require('./routes/auth')
const postRoute= require('./routes/Posts')
const passport =require("passport")


const messageRoute= require('./routes/messages')
const conversationRoute= require('./routes/conversations')

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('connected with mongodb'))
.catch((err)=> console.log(err))
//middleware

// console.log(process.env.MONGO_URL)
console.log("ok")

app.use(express.json())
app.use(helmet())
 app.use(morgan("common"))
 app.use(cors())

app.use(express.static('public'));
app.use(passport.initialize())
require("./config/passport")


 app.use("/api/auth",authRoute)
 app.use("/api/users",userRoute)
 app.use("/api/posts",postRoute)
 app.use("/api/messages",messageRoute)
 app.use("/api/conversations",conversationRoute)


app.listen(8000,()=>{
    console.log("backend server run in port 8000")
})