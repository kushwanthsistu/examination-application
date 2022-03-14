const express = require('express') ;
const cors = require('cors') ;
const ejs = require('ejs') ;
const patternmpc = require('../questionpapers/patternmpc.json') ;
const patternbiology = require('../questionpapers/patternbiology.json') ;
const path = require('path') ;
const cookieparser = require("cookie-parser") ;
let resultdetails = require('../questionpapers/resultdetails.json') ;
// resultdetails.totalquestions = pattern.number ;
// console.log(data) ;

const router = express.Router() ;
router.use(express.static(__dirname + '/public')) ;
router.use(express.urlencoded({ extended : true })) ;
router.use(express.json()) ;
router.use(cookieparser()) ;

router.get('/', (req, res) => {
    res.cookie('name', 'kushwanth') ;
    res.render('exampageworking.ejs') ;
})

router.get('/:subject/:id/confirmation', (req, res) => {
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

router.get('/page/:subject/:id/data', (req, res) => {
    if(req.cookies.startedexam) {
    const data = require(`../questionpapers/${req.params.subject}_${req.params.id}.json`) ;

    res.json(data) ;
    }
})

// router.get('/page/:next', (req, res) => {
//     const { next } = req.params ;
//     if(next >= pattern.number)
//     res.json(undefined) ;
//     else
//     res.json(data[next]) ;
// })


router.get('/:subject/:id/submitted', (req, res) => {
    res.render('successpage.ejs', { ...req.params }) ;
})

router.get('/:subject/:id/solutionpage', (req, res) => {
    let result = req.cookies.result ;
    result = JSON.parse(result) ;
    res.clearCookie('result') ;
    res.clearCookie('startedexam') ;
    let resultanalysis ;
    let key = require(`../questionpapers/${req.params.subject}_${req.params.id}answers.json`) ;

    if(req.params.subject == "biology")
    resultanalysis = evaluate(result, key, 90) ;
    else
    resultanalysis = evaluate(result, key, 25) ;
    const data = require(`../questionpapers/${req.params.subject}_${req.params.id}.json`) ;
    res.render('solutionpage.ejs', { result, key : key, ...resultanalysis, data }) ;
    // res.send(resultdetails) ;
})

function evaluate(result, key, totalno) {
    resultdetails.totalquestions = totalno ;
    resultdetails.score = 0 ;
    resultdetails.correct = 0 ;
    resultdetails.incorrect = 0 ;
    for(let i = 0;i<totalno;i++) {
        if(result[`answer${i}`]) {
            if(result[`answer${i}`] === key[`answer${i}`]) {
            resultdetails.score = resultdetails.score + 4 ;
            resultdetails.correct++ ;
            }
            else if(result[`answer${i}`] === "notanswered")
            resultdetails.score = resultdetails.score - 0 ;
            else {
            resultdetails.score = resultdetails.score - 1 ;
            resultdetails.incorrect++ ;
            }
        }
    }
    return resultdetails ;
}

module.exports = router ;