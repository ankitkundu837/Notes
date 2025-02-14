const cors = require('cors')
const express = require('express');
const path = require('path');    
const ejs = require('ejs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://127.0.0.1:27017/To-Do-List')
.then((e)=> console.log("MongoDB Connected"))
const note = require('./models/note');

const userRoute = require('./routes/user')
const noteRoute = require('./routes/note')

const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const app = express();
const PORT = 8001;

app.set("view engine","ejs")
app.set("views", path.resolve( "views"));

//middleware
app.use(cors({
    origin: true, 
    credentials: true 
}))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.get('/',async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user , label : {$ne: "bin"}});
    return res.render('home',{
        user: req.user,
        notes: allNotes,
    });
})

app.get('/:label',async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user , label : req.params.label});
    return res.render('home',{
        user: req.user,
        notes: allNotes,
    });
})


app.use('/user',userRoute) 
// If any request start with /user then use `userRoute`
app.use('/note',noteRoute) 




app.listen(PORT , ()=>console.log(`Server started at PORT:${PORT}`));

