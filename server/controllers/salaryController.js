import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js"

const addSalary = async (req, res) => {
    try {
        const {
            employeeId,
            basicSalary,
            allowances,
            deductions,
            payDate
        } = req.body;

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();

        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: employeeId },
            { salary: totalSalary, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Salary added and employee salary updated",
            newSalary,
            updatedEmployee
        });
    } catch (error) {
        console.error("Error adding salary:", error);
        return res.status(500).json({ success: false, error: "Server error while adding salary" });
    }
};

const getSalary = async(req, res) =>{
    try {
        const { role, params: { id } } = req;
        let salary
        if(role === "admin"){
            salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
        }else{
            const employee = await Employee.findOne({userId: id})
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
        }
        return res.status(200).json({success: true, salary})
    } catch (error) {
        return res.status(500).json({success: false, error: "salary get server error"})
    }
}
export {addSalary, getSalary}