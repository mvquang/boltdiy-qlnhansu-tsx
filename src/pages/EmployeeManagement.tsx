import React, { useState, useEffect } from 'react'
import { Employee } from '../types'
import EmployeeTable from '../components/EmployeeTable'
import EmployeeDetail from '../components/employee/EmployeeDetail'
import EmployeeForm from '../components/employee/EmployeeForm'

const EmployeeManagement: React.FC = () => {
  // Mock data for employees
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'Jane Cooper',
      position: 'Software Engineer',
      department: 'Engineering',
      departmentId: 1,
      status: 'active',
      email: 'jane.cooper@example.com',
      hireDate: '2020-01-15',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, CA 94568',
      salary: 85000,
      manager: 'Michael Scott',
      managerId: 5
    },
    {
      id: 2,
      name: 'John Smith',
      position: 'Marketing Specialist',
      department: 'Marketing',
      departmentId: 2,
      status: 'active',
      email: 'john.smith@example.com',
      hireDate: '2019-06-20',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Somewhere, CA 94569',
      salary: 65000,
      manager: 'Angela Martin',
      managerId: 6
    },
    {
      id: 3,
      name: 'Robert Johnson',
      position: 'Sales Manager',
      department: 'Sales',
      departmentId: 3,
      status: 'on-leave',
      email: 'robert.johnson@example.com',
      hireDate: '2018-03-10',
      phone: '(555) 345-6789',
      address: '789 Pine St, Nowhere, CA 94570',
      salary: 95000,
      manager: 'Michael Scott',
      managerId: 5
    },
    {
      id: 4,
      name: 'Emily Davis',
      position: 'HR Coordinator',
      department: 'Human Resources',
      departmentId: 4,
      status: 'active',
      email: 'emily.davis@example.com',
      hireDate: '2021-02-05',
      phone: '(555) 456-7890',
      address: '101 Maple Dr, Elsewhere, CA 94571',
      salary: 70000,
      manager: 'Angela Martin',
      managerId: 6
    },
    {
      id: 5,
      name: 'Michael Scott',
      position: 'Regional Manager',
      department: 'Management',
      departmentId: 5,
      status: 'active',
      email: 'michael.scott@example.com',
      hireDate: '2015-04-15',
      phone: '(555) 567-8901',
      address: '202 Cedar Ln, Anytown, CA 94568',
      salary: 120000
    },
    {
      id: 6,
      name: 'Angela Martin',
      position: 'Head of Accounting',
      department: 'Finance',
      departmentId: 6,
      status: 'active',
      email: 'angela.martin@example.com',
      hireDate: '2016-08-22',
      phone: '(555) 678-9012',
      address: '303 Birch Rd, Somewhere, CA 94569',
      salary: 110000,
      manager: 'Michael Scott',
      managerId: 5
    },
    {
      id: 7,
      name: 'David Miller',
      position: 'UX Designer',
      department: 'Design',
      departmentId: 7,
      status: 'active',
      email: 'david.miller@example.com',
      hireDate: '2020-05-12',
      phone: '(555) 789-0123',
      address: '404 Elm St, Nowhere, CA 94570',
      salary: 80000,
      manager: 'Michael Scott',
      managerId: 5
    },
    {
      id: 8,
      name: 'Jennifer Taylor',
      position: 'Content Writer',
      department: 'Marketing',
      departmentId: 2,
      status: 'on-leave',
      email: 'jennifer.taylor@example.com',
      hireDate: '2021-01-08',
      phone: '(555) 890-1234',
      address: '505 Walnut Ave, Elsewhere, CA 94571',
      salary: 60000,
      manager: 'Angela Martin',
      managerId: 6
    }
  ])

  // Mock data for departments
  const [departments] = useState([
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Sales' },
    { id: 4, name: 'Human Resources' },
    { id: 5, name: 'Management' },
    { id: 6, name: 'Finance' },
    { id: 7, name: 'Design' }
  ])

  // State for view mode
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'add' | 'edit'>('list')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Filtered employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = departmentFilter === '' || employee.department === departmentFilter
    const matchesStatus = statusFilter === '' || employee.status === statusFilter
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Get managers for dropdown
  const managers = employees
    .filter(emp => emp.position.toLowerCase().includes('manager') || 
                  emp.position.toLowerCase().includes('director') ||
                  emp.position.toLowerCase().includes('lead'))
    .map(emp => ({ id: emp.id, name: emp.name }))

  // Handle view employee details
  const handleViewEmployee = (employeeId: number) => {
    const employee = employees.find(emp => emp.id === employeeId)
    if (employee) {
      setSelectedEmployee(employee)
      setViewMode('detail')
    }
  }

  // Handle add new employee
  const handleAddEmployee = () => {
    setSelectedEmployee(null)
    setViewMode('add')
  }

  // Handle edit employee
  const handleEditEmployee = (employeeId: number) => {
    const employee = employees.find(emp => emp.id === employeeId)
    if (employee) {
      setSelectedEmployee(employee)
      setViewMode('edit')
    }
  }

  // Handle delete employee
  const handleDeleteEmployee = (employeeId: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId))
    }
  }

  // Handle form submission
  const handleEmployeeFormSubmit = (formData: any) => {
    if (viewMode === 'add') {
      // Add new employee
      const newEmployee: Employee = {
        id: Math.max(...employees.map(e => e.id)) + 1,
        name: formData.name,
        position: formData.position,
        departmentId: formData.departmentId,
        department: departments.find(d => d.id === formData.departmentId)?.name || '',
        status: formData.status,
        email: formData.email,
        hireDate: formData.hireDate,
        phone: formData.phone,
        address: formData.address,
        salary: formData.salary,
        managerId: formData.managerId,
        manager: formData.managerId ? employees.find(e => e.id === formData.managerId)?.name : undefined
      }
      setEmployees([...employees, newEmployee])
    } else if (viewMode === 'edit' && selectedEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map(emp => {
        if (emp.id === selectedEmployee.id) {
          return {
            ...emp,
            name: formData.name,
            position: formData.position,
            departmentId: formData.departmentId,
            department: departments.find(d => d.id === formData.departmentId)?.name || '',
            status: formData.status,
            email: formData.email,
            hireDate: formData.hireDate,
            phone: formData.phone,
            address: formData.address,
            salary: formData.salary,
            managerId: formData.managerId,
            manager: formData.managerId ? employees.find(e => e.id === formData.managerId)?.name : undefined
          }
        }
        return emp
      })
      setEmployees(updatedEmployees)
    }
    setViewMode('list')
  }

  // Render content based on view mode
  const renderContent = () => {
    switch (viewMode) {
      case 'list':
        return (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Employee Management</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage all employees in your organization
                </p>
              </div>
              <button 
                onClick={handleAddEmployee}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Employee
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search employees"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                      <option value="">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                      ))}
                    </select>
                    <select 
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="on-leave">On Leave</option>
                      <option value="terminated">Terminated</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hire Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-800 font-medium">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div 
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                onClick={() => handleViewEmployee(employee.id)}
                              >
                                {employee.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${employee.status === 'active' ? 'bg-green-100 text-green-800' : 
                              employee.status === 'on-leave' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {employee.status === 'active' ? 'Active' : 
                            employee.status === 'on-leave' ? 'On Leave' : 'Terminated'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.hireDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleEditEmployee(employee.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployees.length}</span> of{' '}
                      <span className="font-medium">{filteredEmployees.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-indigo-600 hover:bg-gray-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'detail':
        return selectedEmployee ? (
          <EmployeeDetail 
            employee={selectedEmployee} 
            onEdit={() => setViewMode('edit')} 
            onBack={() => setViewMode('list')} 
          />
        ) : null
      
      case 'add':
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Add New Employee</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create a new employee record
              </p>
            </div>
            <EmployeeForm 
              departments={departments}
              managers={managers}
              onSubmit={handleEmployeeFormSubmit}
              onCancel={() => setViewMode('list')}
            />
          </div>
        )
      
      case 'edit':
        return selectedEmployee ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Edit Employee</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update employee information
              </p>
            </div>
            <EmployeeForm 
              initialData={{
                name: selectedEmployee.name,
                position: selectedEmployee.position,
                departmentId: selectedEmployee.departmentId,
                status: selectedEmployee.status,
                email: selectedEmployee.email,
                hireDate: selectedEmployee.hireDate,
                phone: selectedEmployee.phone,
                address: selectedEmployee.address,
                salary: selectedEmployee.salary,
                managerId: selectedEmployee.managerId
              }}
              departments={departments}
              managers={managers.filter(m => m.id !== selectedEmployee.id)} // Can't be own manager
              onSubmit={handleEmployeeFormSubmit}
              onCancel={() => setViewMode('list')}
            />
          </div>
        ) : null
      
      default:
        return null
    }
  }

  return (
    <div>
      {renderContent()}
    </div>
  )
}

export default EmployeeManagement
