import Employee from '../models/Employee.js'
import Leave from '../models/Leave.js'
const addLeave = async (req, res) => {
    try {
        const {
            userId,
            leaveType,
            startDate,
            endDate,
            reason
        } = req.body

        const employee = await Employee.findOne({ userId })

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        })

        await newLeave.save()

        return res.status(200).json({ success: true, newLeave })
    } catch (error) {
        return res.status(500).json({ success: false, error: "leave add server error" })
    }
}
const getLeave = async (req, res) => {
    try {
        const { role, params: { id } } = req;
        let leaves
        if (role === "admin") {
            leaves = await Leave.find({ employeeId: id })
        } else{
            const employee = await Employee.findOne({ userId: id })
            leaves = await Leave.find({ employeeId: employee._id })
        }
        return res.status(200).json({ success: true, leaves })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: "get leave server error" })
    }
}
const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: 'employeeId',
            populate: [
                {
                    path: "department",
                    select: "dept_name"
                },
                {
                    path:'userId',
                    select: 'name'
                }
            ]
        })
        return res.status(200).json({ success: true, leaves })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: "get leaves server error" })
    }
}
const updateLeave = async (req, res) => {
    try {
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!leave){
            return res.status(404).json({ success: false, error: "leave not founded" })
        }
        return res.status(200).json({ success: true, leave })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, error: "leave update server error" })
    }
}
const getLeaveDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: 'employeeId',
            populate: [
                {
                    path: "department",
                    select: "dept_name"
                },
                {
                    path: "userId",
                    select: "neme profileImage"
                }
            ]
        })

        return res.status(200).json({success: true, leave})
    } catch (error) {
        console.log(error.message)

        return res.status(500).json({ success: false, error: "leave detail server error" })
    }
}

export { addLeave, getLeaves, getLeave, updateLeave, getLeaveDetail }