const mongoose = require("mongoose")
const password = "landete22"
const dbname = "thepeople"
const user = "daniellandete"
const host = "cluster0.ukxpm.mongodb.net"
const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`
module.exports = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})