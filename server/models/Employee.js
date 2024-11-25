import { Schema, model } from 'mongoose';

const EmployeeSchema = new Schema({
    userId : { type: Schema.Types.ObjectId, ref: "User", required: true},
    employeeId: { type: String, required: true, unique: true},
    dob: { type: Date},
    gender: {type: String},
    maritalStatus: {type: String},
    designation: {type: String},
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true},
    salary: { type: Number, required: true},
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
});

const Employee = model('Employee', EmployeeSchema);

export default Employee;
