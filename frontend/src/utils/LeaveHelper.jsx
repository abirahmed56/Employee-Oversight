import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Emp Id",
        selector: (row) => row.employeeId,
        width: "110px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px"
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "140px"
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "150px"
    },
    {
        name: "Days",
        selector: (row) => row.Days,
        width: "80px"
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "100px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    },
    
]

export const LeaveButtons = ({Id})=>{
    const navigate = useNavigate();

    const handleView = (id) =>{
        console.log(id)
        navigate(`/admin-dashboard/leaves/${id}`);
    };
    return (
        <button 
            className="px-4 py-1 bg-gray-600 rounded text-white hover:bg-gray-800"
            onClick={handleView(Id)}
        >
            View
        </button>
    )
}