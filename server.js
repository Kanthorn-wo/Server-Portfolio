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
    // ไม่ทำ 308 Redirect
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }

    res.header('Access-Control-Allow-Origin', 'https://jarmoo-portfolio-alpha.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.header('Access-Control-Allow-Credentials', 'true');
});


readdirSync('./Routes')
    .map((r) => app.use('/api', require('./Routes/' + r)))


app.listen(5000, () => console.log('Server is Running 5000'))