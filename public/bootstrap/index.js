const collapsebutton = document.getElementById('collapsebutton') ;
var toggle = 0 ;

const collapse = () => {
    if(toggle == 1) {
        var targetclass = document.getElementById('collapsenav').className ;
        targetclass = targetclass + " d-none" ;
        document.getElementById('collapsenav').className = targetclass ;
        toggle = 0 ;
    }
    else {
        var targetclass = document.getElementById('collapsenav').className ;
        targetclass = targetclass.slice(0, -7) ;
        document.getElementById('collapsenav').className = targetclass ;
        toggle = 1 ;
    }
}

collapsebutton.addEventListener('click',collapse, false ) ;