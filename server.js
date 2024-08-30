const express=require('express')
const app= express()
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
app.use(express.json());
const userRouter=require('./routers/userrouter')
const adminRouter=require('./routers/adminrouter')
const quizRouter = require('./routers/quizrouter');
const mongoose=require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
const session=require('express-session')
const cron = require('node-cron');
const Quiz = require('./models/quiz');

cron.schedule('* * * * * *', async () => {
    const now = new Date();
    try {
        await Quiz.updateMany({ startDate: { $lte: now }, endDate: { $gte: now } }, { status: 'active' });
        await Quiz.updateMany({ endDate: { $lt: now } }, { status: 'finished' });
    } catch (err) {
        console.error('Error updating quiz status', err);
    }
});






app.use(session({
    secret:process.env.KEY,
    saveUninitialized:false,
    resave:false
}))
app.use(userRouter)
app.use('/admin',adminRouter)
app.use('/quiz', quizRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{console.log(`server is running on port ${process.env.PORT}`)})