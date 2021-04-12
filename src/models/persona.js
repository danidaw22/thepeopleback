const mongoose = require("mongoose")
const SchemaMongo = mongoose.Schema

const Schema = new SchemaMongo({
    name: { type: String, require: true },
    date_of_birthday: { type: String, require: true },
    date_of_death: { type: Date },
    job: { type: String, require: true },
    bio: { type: String },
    photo: { type: String }
})



module.exports = mongoose.model("persona", Schema)