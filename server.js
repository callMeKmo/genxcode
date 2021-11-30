// enviroment variables configration:

if (process.env.NODE_ENV !== 'production') {
    if (process.env.NODE_ENV !== 'development'){
        console.log('Enviroment: Local.')
        require('dotenv').config()
    }
    console.log('Enviroment: Development.')
} else {
    console.log('Enviroment: Production.')
}

// server modules:

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const http = require('http')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const server = http.createServer(app)
const io = new Server(server)
module.exports = io

// web routes:

const mainRoute = require('./routes/main')
const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth')
const booksRoute = require('./routes/books')
const coursesRoute = require('./routes/courses')
const newsRoute = require('./routes/news')
const userRoute = require('./routes/user')

// express server setup:

app.set('view engine', 'ejs')
app.set('views', __dirname + '/webApp')
app.set('layout', 'layouts/main')
app.use(expressLayouts)
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(cookieParser())

// database set ( NoSQL mongoose)

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error('Database running: Failed, \n Error: '+error))
db.once('open', () => console.log('Database running: Success.'))

// webApp routing:

app.use('/',mainRoute)
app.use('/a',adminRoute)
app.use('/c',coursesRoute)
app.use('/b',booksRoute)
app.use('/n',newsRoute)
app.use('/u',userRoute)
app.use('/o',authRoute)

// server host:

server.listen(process.env.PORT || 3000, console.log(`Server running: Success.`))

server.on('error', error => console.error('Server running: Failed, \n Error: ' + error))