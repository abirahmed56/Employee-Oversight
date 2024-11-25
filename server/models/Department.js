import mongoose from "mongoose";

const depertmentSchema = new mongoose.Schema({
    dept_name: {type: String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now}
})

const Department = mongoose.model("Department", depertmentSchema)

export default Department