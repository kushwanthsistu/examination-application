const express = require('express') ;
const cors = require('cors') ;
const data = require('../questionpapers/physics_1.json') ;
const ejs = require('ejs') ;
const key = require('../questionpapers/answers.json') ;
const patternmpc = require('../questionpapers/patternmpc.json') ;
const patternbiology = require('../questionpapers/patternbiology.json') ;
const path = require('path') ;
let resultdetails = require('../questionpapers/resultdetails.json') ;
// resultdetails.totalquestions = pattern.number ;
// console.log(data) ;
path.join(__dirname , 'public') ;
let result ;

const router = express.Router() ;
router.use(express.static('public')) ;
router.use(express.urlencoded({ extended : true })) ;
router.use(express.json()) ;
router.use(cors()) ;

router.get('/', (req, res) => {
    res.render('exampageworking.ejs') ;
})

router.get('/:subject/:id/confirmation', (req, res) => {
    res.cookie('subject',`${req.params.subject}`) ;
    res.render('instructionspage.ejs', { ...req.params });
})

router.get('/page/:subject/:id', (req, res) => {
    const {subject, id} = req.params ;
    if(subject == "biology") {
        patternbiology.id = id ;
        res.render('exampage.ejs', { ...patternbiology }) ;
    }
    else {
        patternmpc.subject = subject ;
        patternmpc.id = id ;
        res.render('exampage.ejs', { ...patternmpc }) ;
    }
})

router.get('/remodelling', (req, res) => {
    res.json(data) ;
})

// router.get('/page/:next', (req, res) => {
//     const { next } = req.params ;
//     if(next >= pattern.number)
//     res.json(undefined) ;
//     else
//     res.json(data[next]) ;
// })

// router.post('/submit', (req, res) => {
//     result = req.body ;
//     resultdetails.score = evaluate(result) ;
//     console.log(key) ;
//     console.log(result) ;
//     console.log(resultdetails.score) ;
//     // res.send(`<h1>successfully submitted</h1><h2>your score is ${score}</h2>`) ;
// })

// router.get('/submitted', (req, res) => {
//     res.render('successpage.ejs') ;
// })

// router.get('/solutionpage', (req, res) => {
//     res.render('solutionpage.ejs', { result, key : key, ...resultdetails }) ;
//     // res.send(resultdetails) ;
// })

// function evaluate(result) {
//     resultdetails.score = 0 ;
//     resultdetails.correct = 0 ;
//     resultdetails.incorrect = 0 ;
//     for(let i = 0;i<pattern.number;i++) {
//         if(result[`answer${i}`]) {
//             if(result[`answer${i}`] === key[`answer${i}`]) {
//             resultdetails.score = resultdetails.score + 4 ;
//             resultdetails.correct++ ;
//             }
//             else if(result[`answer${i}`] === "notanswered")
//             resultdetails.score = resultdetails.score - 0 ;
//             else {
//             resultdetails.score = resultdetails.score - 1 ;
//             resultdetails.incorrect++ ;
//             }
//         }
//     }
//     return resultdetails.score ;
// }

module.exports = router ;