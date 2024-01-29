const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/demo')
        await mongoose.connect('mongodb+srv://kanthornwo:rmhBgbIoozRRrypD@cluster0.wukdrub.mongodb.net/demo')
        console.log('DB Connected')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB