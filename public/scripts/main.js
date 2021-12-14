// website main script here

var win = window, container = document.getElementById('container')

const resize = ()=>{
    container.style.width = `${win.innerWidth}px`
    container.style.height = `${win.innerHeight}px`
}

win.onresize = e=>{
    resize()
}
if (document.getElementById('customNote')){
    document.getElementById('closee').addEventListener('click',e=>{
        document.getElementById('customNote').style.display = 'none'
    })
}
resize()