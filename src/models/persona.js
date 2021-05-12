const mongoose = require("mongoose")
const SchemaMongo = mongoose.Schema

const Schema = new SchemaMongo({
    name: { type: String, require: true },
    surname: { type: String, require: true },
    birthdate: { type: Date, require: true },
    job: { type: String, require: true },
    bio: { type: String },
    photo: { type: String },
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})



module.exports = mongoose.model("persona", Schema)