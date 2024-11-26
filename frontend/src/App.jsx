import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/department/DepartmentList'
import AddDepartment from './components/department/AddDepartment'
import EditDepartment from './components/department/EditDepartment'
import List from './components/employee/List'
import Add from './components/employee/Add'
import View from './components/employee/View'
import Edit from './components/employee/Edit'
import AddSalary from './components/salary/AddSalary'
import ViewSalary from './components/salary/ViewSalary'
import SummaryCard from './components/EmployeeDashboard/Summary'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={"/admin-dashboard"} />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary />}></Route>
          <Route path='/admin-dashboard/departments' element={<DepartmentList />}></Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />}></Route>
          <Route path='/admin-dashboard/department/:id' element={<EditDepartment />}></Route>

          <Route path='/admin-dashboard/employees' element={<List />}></Route>
          <Route path='/admin-dashboard/add-employee' element={<Add />}></Route>
          <Route path='/admin-dashboard/employees/:id' element={<View />}></Route>
          <Route path='/admin-dashboard/edit-employees/:id' element={<Edit />}></Route>
          <Route path='/admin-dashboard/employee-salary/:id' element={<ViewSalary />}></Route>

          <Route path='/admin-dashboard/salary/add' element={<AddSalary />}></Route>


        </Route>
        <Route
          path='/employee-dashboard'
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
            
          }
        >
          <Route index element={<SummaryCard/>}></Route>

          <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
          <Route path='/employee-dashboard/leaves' element={<DepartmentList />}></Route>
          <Route path='/employee-dashboard/salary' element={<DepartmentList />}></Route>
          <Route path='/employee-dashboard/settings' element={<DepartmentList />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
