//node modules

const fs = require('fs')
const key = require('./keygen')
const { exec } = require("child_process");

// install dependencies

if (!fs.existsSync('./node_modules')) {
    exec("npm run install", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return;
        }
        console.log(`stdout: ${stdout}`)
    })
}

// rewrite enviormant varibals

content = 
`DATABASE_URL = mongodb://localhost/${key.generate(16)}
ACCESS_TOKEN_SECRET = ${key.generate(128)}
REFRESH_TOKEN_SECRET = ${key.generate(128)}
STRING_CMD = ${key.generate(16)}
ALGORITHM = aes-256-cbc`

fs.writeFile('.env',content, (err)=>{
    if (err) console.log('error: ' + err)
})