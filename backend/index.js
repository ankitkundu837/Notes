const express = require("express")
const {connectToMongoDB} = require('./connect')
const path = require('path')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly , checkAuth} = require('./middleware/auth')

const staticRoute = require('./routers/static')
const userRoute = require('./routers/user')
const todolist = require('./routers/list')

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/Tasks')
.then (()=> console.log("MongoDB connected"))

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);
app.use("/app",restrictToLoggedinUserOnly, todolist)
app.listen(PORT , ()=> console.log(`Server started at port : ${PORT}`))