if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('Light','Dark')
} else {
    setTheme('Dark','Light')
}
if (document.getElementById('systemThemeDark') !=null)  document.getElementById('systemThemeDark').addEventListener('click',e=>{setTheme('Light','Dark')})
if (document.getElementById('systemThemeLight') !=null)  document.getElementById('systemThemeLight').addEventListener('click',e=>{setTheme('Dark','Light')})
function setTheme(from,to){
    document.querySelectorAll(`.bg${from}1`).forEach(elm=>{
        elm.classList.replace(`bg${from}1`,`bg${to}1`)
    })
    document.querySelectorAll(`.bg${from}2`).forEach(elm=>{
        elm.classList.replace(`bg${from}2`,`bg${to}2`)
    })
    document.querySelectorAll(`.hover${from}`).forEach(elm=>{
        elm.classList.replace(`hover${from}`,`hover${to}`)
    })
    document.querySelectorAll(`.text${from}`).forEach(elm=>{
        elm.classList.replace(`text${from}`,`text${to}`)
    })
    document.querySelectorAll(`.btn${from}`).forEach(elm=>{
        elm.classList.replace(`btn${from}`,`btn${to}`)
    })
    document.querySelectorAll(`.input${from}`).forEach(elm=>{
        elm.classList.replace(`input${from}`,`input${to}`)
    })
    document.querySelectorAll(`.nav${from}`).forEach(elm=>{
        elm.classList.replace(`nav${from}`,`nav${to}`)
    })
    document.body.setAttribute('theme',`${to}`)
    if (document.getElementById(`systemTheme${from}`) != null)   document.getElementById(`systemTheme${from}`).style.display = 'block'
    if (document.getElementById(`systemTheme${to}`) != null)   document.getElementById(`systemTheme${to}`).style.display = 'none'
}