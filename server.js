const express = require('express')

const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const connectDB = require('./Config/db')
const { readdirSync } = require('fs')
const app = express();

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.options("*", cors);
app.use(bodyParse.json({ limit: '10mb' }))

// Middleware to handle CORS for specific routes
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, you may want to specify only trusted origins
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Allow credentials (e.g., cookies)
    res.header('Access-Control-Allow-Credentials', 'true');

    // Continue to the next middleware
    next();
});


readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)))


app.listen(5000, () => console.log('Server is Running 5000'))