const fs = require('fs')
const data = JSON.parse(fs.readFileSync('data.json'),'utf-8')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

if (data.user == undefined) {
    console.log('Is that your first time using deploy assistant?\n')
    readline.question('What is your name? ', name => {
        var obj = {}
        Object.keys(data).forEach(key=>{
            obj[key] = data[key]
        })
        obj.user = name
        readline.question('\nWhat is your password? ', password => {
            obj.password = password
            var json = JSON.stringify(obj)
            fs.writeFileSync('data.json',json,'utf-8')
            selectAction()
            readline.close();
        });
    });
} else {
    console.log(`Welcome back ${data.user}`)
    selectAction()
}

function selectAction(){
    console.log('\nHow can i help you?\n\n--write push for pushing your update\n--write pull for getting last update\n--write profile for changing your data')
    readline.question('\nAction: ', action => {
        if (action == null || action == undefined || action === ""){
            reaction()
        } else if (action == 'pull'){
            pullRequest()
        }
        else if (action == 'profile'){
            profile()
        }
        else if (action == 'push'){
            pushRequest()
        } else {
            reaction()
        }
    });
}
function reaction(){
    readline.question('\nInvalid action please tryagain.\nAction: ', action => {
        if (action == null || action == undefined || action === ""){
            reaction()
        } else if (action == 'pull'){
            pullRequest()
        }
        else if (action == 'profile'){
            profile()
        }
        else if (action == 'push'){
            pushRequest()
        } else {
            reaction()
        }
    });
}

function exec(cmd, handler = function(error, stdout, stderr){console.log(stdout);if(error !== null){console.log(stderr)}})
{
    const childfork = require('child_process');
    return childfork.exec(cmd, handler);
}

function pullRequest() {
    exec('concurrently "git add . && git commit -m "v1.1.1"')
}

function pushRequest() {
    
}

function profile() {
    readline.question(`\n Hello ${data.user} what do you want to change?(name/password): `,action =>{
        if (action == null || action == undefined || action === ""){
            reprofile()
        } else if (action == 'name'){
            changeUsername()
        }
        else if (action == 'password'){
            changePassword()
        } else {
            reprofile()
        }
    })
}

function reprofile(){
    readline.question(`\n Invalid input please tryagain (name/password): `,action =>{
        if (action == null || action == undefined || action === ""){
            reprofile()
        } else if (action == 'name'){
            changeUsername()
        }
        else if (action == 'password'){
            changePassword()
        } else {
            reprofile()
        }
    })
}

function changeUsername(){
    readline.question('\nWhat is your new name? ', name => {
        var obj = {}
        Object.keys(data).forEach(key=>{
            obj[key] = data[key]
        })
        obj.user = name
        var json = JSON.stringify(obj)
        fs.writeFileSync('data.json',json,'utf-8')
        readline.close();
    });
}

function changePassword(){
    readline.question('\nWhat is your new password? ', password => {
        var obj = {}
        Object.keys(data).forEach(key=>{
            obj[key] = data[key]
        })
        obj.password = password
        var json = JSON.stringify(obj)
        fs.writeFileSync('data.json',json,'utf-8')
        readline.close();
    });
}