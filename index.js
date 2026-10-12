const express = require('express');
const connectToMongoDB = require('./connect');
const path = require('path')
const cookieParser = require('cookie-parser')
const {checkForAuthorization,restrictTO } = require('./middlewares/auth')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRoute')
const userRoute = require('./routes/user')

const app = express();
const PORT = 8008;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(()=> console.log('mongoDB is connected'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthorization)

app.use('/url', restrictTO(['NORMAL']), urlRoute)
app.use('/',  staticRoute);
app.use('/user', userRoute)



app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})