const express = require('express') ;
const ejs = require('ejs') ;
const path = require('path') ;
const examinationrouter = require('./routers/examination_router.js') ;

const app = express() ;
path.join(__dirname , 'public') ;

app.set('view-engine', 'ejs') ;

app.use('/exam', examinationrouter) ;
app.use(express.static('public')) ;

app.get('/', (req, res) => {
    res.render('profilepage.ejs') ;
})

const port = process.env.PORT || 5000 ;

app.listen(port ,() => {
    console.log(`listening on ${port}`) ;
})