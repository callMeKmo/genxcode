// website main script here

var win = window, container = document.getElementById('container')

const resize = ()=>{
    container.style.width = `${win.innerWidth}px`
    container.style.height = `${win.innerHeight}px`
}

win.onresize = e=>{
    resize()
}
resize()
var checkFirsto = false
checkFirsto = getCookie('checkFirsto')
if (document.getElementById('usr') && document.getElementById('ema') && document.getElementById('dn')){
    alert('here')
    if (document.getElementById('usr').value != null && document.getElementById('usr').value !== ''){
        var u = document.getElementById('usr').value
    }
    if (document.getElementById('ema').value != null && document.getElementById('ema').value !== ''){
        var e = document.getElementById('ema').value
    }
    if (document.getElementById('dn').value != null && document.getElementById('dn').value !== ''){
        var d = document.getElementById('dn').value
    }
    window.addEventListener("change", funcRef(u,e,d), false);
}

function funcRef(u,e,d){
    if (checkFirsto === '1'){
        window.location.href = `/o/t/v/re?username=${u}&email=${e}&dna=${d}&origin=${window.location}`
    } else {
        document.cookie = "checkFirsto = 1";
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}