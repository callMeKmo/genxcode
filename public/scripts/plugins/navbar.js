// navbar script here

if (location.pathname !== '/'){
    document.querySelectorAll('.about')[0].href = '/'
}

document.querySelectorAll('.func')[0].addEventListener('click',e=>{
    if (document.querySelectorAll('.func')[0].classList.contains('menuDrop')){
        document.getElementById('hiddenMenu').style.display = 'grid'
        document.querySelectorAll('.menuDrop')[0].classList.replace('menuDrop','menuCatch')
    } else if (document.querySelectorAll('.func')[0].classList.contains('menuCatch')){
        document.getElementById('hiddenMenu').style.display = 'none'
        document.querySelectorAll('.menuCatch')[0].classList.replace('menuCatch','menuDrop')
    }
})

var ico = document.querySelectorAll('.ico-to-side')

if (ico.length > 0){
    ico.forEach(element=>{
        element.addEventListener('click',e=>{
            document.querySelectorAll(`.mySpecialUl#nav${element.id}`)[0].style.display = 'block'
        })
    })
}