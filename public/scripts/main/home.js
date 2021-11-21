//home script here

document.querySelectorAll('.sect').forEach(element=>{
    element.style.height = `${window.innerHeight - document.getElementById('nav').clientHeight}px`
})