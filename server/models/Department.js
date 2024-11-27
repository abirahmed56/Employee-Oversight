import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js"

const departmentSchema = new mongoose.Schema({
    dept_name: {type: String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now}
})

departmentSchema.pre("deleteOne", {document:true, query: false}, async function(next){
    try {
        const employee = await Employee.find({department: this._id})
        const empIds = employee.map(emp=> emp._d)

        await Employee.deleteMany({department: this._id})
        await Leave.deleteMany({employeeId: {$in: empIds}})
        await Salary.deleteMany({employeeId: {$in: empIds}})
        next()
    } catch (error) {
        next(error)
    }
})

const Department = mongoose.model("Department", departmentSchema)

export default Department