
window.addEventListener('load', () => {
    let data ;
    let xhr = new XMLHttpRequest() ;
    xhr.open('GET', "http://localhost:3000/exam/remodelling", true) ;
    xhr.send() ;
    xhr.onload = () => {
        data = xhr.responseText ;
        data = JSON.parse(data) ;
        displayquestion(data[0]) ;
        document.getElementById('loadmessage').style.display = "none" ;
        settimer() ;
    }
let timedout = false ;
let hours = 1 ;
let minutes = 0 ;
let seconds = 0 ;
let hourdis = document.getElementById('hours') ;
let minutedis = document.getElementById('minutes') ;
let seconddis = document.getElementById('seconds') ;
function settimer() {
    let timesetter = setInterval(() => {
        if(seconds != 0)
        seconds = seconds-1 ;
        else {
            if(minutes != 0) {
                minutes = minutes - 1 ;
                seconds = 59 ;
            }
            else {
                if(hours != 0) {
                    hours = hours - 1 ;
                    minutes = 59 ;
                    seconds = 59 ;
                }
                else {
                }
            }
        }
        hourdis.innerText = `0${hours}` ;
        if(minutes < 10)
        minutedis.innerText = `0${minutes}` ;
        else 
        minutedis.innerText = `${minutes}` ;
        if(seconds < 10)
        seconddis.innerText = `0${seconds}` ;
        else
        seconddis.innerText = `${seconds}` ;
        if(hours == 0 && minutes == 0 && seconds == 0) {
            clearInterval(timesetter) ;
                submittingdata() ;
                timedout = true ;
        }
    }, 1000) ;
}

let displaybutton = document.getElementById('menubutton') ;
let menutoggle = false ;
let sidepallett = document.getElementById('sidepallett') ;
let options = document.getElementsByName('question') ;
let pickupbutton = document.getElementById('pickans') ;
let number = document.getElementsByClassName('statement') ;
let qnumber = parseInt(number[0].id) ;
qnumber++ ;
let option1 = document.getElementById('option1label') ;
let option2 = document.getElementById('option2label') ;
let option3 = document.getElementById('option3label') ;
let option4 = document.getElementById('option4label') ;
let imagesource = document.getElementById('imagesource') ;
let questiondetails = document.getElementById('questionnumber') ;
// alert(qnumber) ;
let buttons = document.getElementsByClassName('buttons') ;
let ansobject = {

} ;
let attemptedquestion = document.getElementById('attempted') ;
let attempted = 0 ;
let notansweredquestion = document.getElementById('notanswered') ;
let notanswered = 0 ;
let reviewedquestion = document.getElementById('reviewed') ;
let reviewed = 0 ;
let notvisitedquestion = document.getElementById('notvisited') ;
let notvisited = 14 ;

window.addEventListener('resize', () => {
    if(window.innerWidth > 720) 
    sidepallett.style.display = "block" ;
    else
    sidepallett.style.display = "none" ;
}) ;

displaybutton.addEventListener('click', () => {
    if(!menutoggle) {
    sidepallett.style.display = "block" ;
    menutoggle = true ;
    }
    else {
    sidepallett.style.display = "none" ;
    menutoggle = false ;
    }
})

function dataentry() {
    let selected = 0 ;
    for(let option of options) {
        if(option.checked) {
            ansobject[`answer${number[0].id}`] = option.value ;
            selected = 1 ;
            reduction(buttons[`${number[0].id}`].className) ;
            buttons[`${number[0].id}`].className  = "buttons col btn btn-success" ;
            attempted = attempted + 1 ;
            attemptedquestion.innerText = `${attempted}` ;
            // buttons[`${number[0].id}`].style.color = "white" ;
        }
    }
    if(selected == 0) {
    ansobject[`answer${number[0].id}`] = "notanswered" ;
    reduction(buttons[`${number[0].id}`].className) ;
    buttons[`${number[0].id}`].className  = "buttons col btn btn-danger" ;
    notanswered = notanswered + 1 ;
    notansweredquestion.innerText = `${notanswered}` ;
    // buttons[`${number[0].id}`].style.backgroundColor = "red" ;
    // buttons[`${number[0].id}`].style.color = "white" ;
    }
    // console.log(ansobject) ;
}

pickupbutton.addEventListener('click', () => {
    dataentry() ;
            displayquestion(data[`${qnumber}`]) ;
})

const previousbutton = document.getElementById("previous") ;

previousbutton.addEventListener('click', () => {
    dataentry() ;
    displayquestion(data[`${qnumber-2}`]) ;
})

var qbuttons = document.getElementById('qbuttons') ;

qbuttons.addEventListener('click', (e) => {
    dataentry() ;
    let selected = 0 ;
    for(let option of options) {
        if(option.checked) {
            ansobject[`answer${number[0].id}`] = option.value ;
            selected = 1 ;
            
        }
    }
    if(selected == 0)
    ansobject[`answer${number[0].id}`] = "notanswered" ;
    console.log(ansobject) ;
    let gofor = e.target.id ;
    displayquestion(data[`${gofor}`]) ; 
})

function displayquestion(data) {
    number[0].id = data._id ;
    qnumber = parseInt(number[0].id) ;
    qnumber++ ;
    if(`answer${number[0].id}` in ansobject)
    {
        for(let option of options)
        option.checked = false ;
        let p = ansobject[`answer${number[0].id}`] ;
        if(p == "A")
        options[0].checked = true ;
        else if(p == "B")
        options[1].checked = true ;
        else if(p == "C")
        options[2].checked = true ;
        else if(p == "D")
        options[3].checked = true ;
        else {}
    }
    else {
        for(let option of options)
        option.checked = false ;
    }
    questiondetails.innerText = `Question : ${data._id+1}` ;
    number[0].innerHTML = data.statement ;
    option1.innerHTML = data.option1 ;
    option2.innerHTML = data.option2 ;
    option3.innerHTML = data.option3 ;
    option4.innerHTML = data.option4 ;
    imagesource.src = "http://localhost:3000/images/demo.jpg" ;
    buttons[`${data._id}`].className = "btn-dark " + buttons[`${data._id}`].className;
}

let submitbutton = document.getElementById('submit') ;

function submittingdata() {
        if(timedout)
        document.getElementById('messagedelivery').innerText = "Timeout. Submitting..."
        else
        document.getElementById('messagedelivery').innerText = "Submitting..." ;
        document.getElementById('loadmessage').style.display = "block" ;
        const xhr = new XMLHttpRequest() ;
        xhr.open('POST', "http://localhost:3000/exam/submit", true) ;
            xhr.setRequestHeader('Content-Type', 'application/json') ;
            xhr.send(JSON.stringify(ansobject)) ;
            xhr.onload = () => {
                // let data = this.http.responseText ;
                // let employees = JSON.parse(data) ;
                
            }
        window.open('http://localhost:3000/exam/submitted', "_self" , "toolbar=yes, scrollbars=yes, resizable=yes, height=590,width=1200") ;
}

submitbutton.addEventListener('click', submittingdata, false) ;

let markbutton = document.getElementById('markforreview') ;

markbutton.addEventListener('click', () => {
    let selected = 0 ;
    for(let option of options) {
        if(option.checked) {
            ansobject[`answer${number[0].id}`] = option.value ;
            selected = 1 ;
        }
    }
    if(selected == 0) 
    ansobject[`answer${number[0].id}`] = "notanswered" ;
    reduction(buttons[`${number[0].id}`].className) ;
    buttons[`${number[0].id}`].className  = "buttons col btn btn-primary" ;
    reviewed = reviewed + 1 ;
    reviewedquestion.innerText = `${reviewed}` ; 
    // buttons[`${number[0].id}`].style.backgroundColor = "blue" ;
    // buttons[`${number[0].id}`].style.color = "white" ;
    // console.log(ansobject) ;
            displayquestion(data[`${qnumber}`]) ;
})

function reduction(s) {
    let a = s.lastIndexOf('-') ;
    let b = s.substr(a+1) ;
    if(b == "success") {
        attempted = attempted - 1 ;
        attemptedquestion.innerText = `${attempted}` ;
    }
    else if(b == "primary") {
        reviewed = reviewed - 1 ;
        reviewedquestion.innerText = `${reviewed}` ;
    }
    else if(b == "danger") {
        notanswered = notanswered - 1 ;
        notansweredquestion.innerText = `${notanswered}` ;
    }
    else {
        notvisited = notvisited -1 ;
        notvisitedquestion.innerText = `${notvisited}` ;
    }
}
}) ;

let resetbutton = document.getElementById('resetbutton') ;

resetbutton.addEventListener('click', () => {
    let options = document.getElementsByName('question') ;
    for(let option of options) {
        option.checked = false ;
            ansobject[`answer${number[0].id}`] = "notanswered" ;
            // selected = 1 ;
        }
})