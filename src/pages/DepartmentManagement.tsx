import React, { useState, useEffect } from 'react'
import { Department, Employee } from '../types'
import DepartmentDetail from '../components/department/DepartmentDetail'
import DepartmentForm from '../components/department/DepartmentForm'

const DepartmentManagement: React.FC = () => {
  // Mock data for departments
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: 'Engineering',
      description: 'Responsible for developing and maintaining software products.',
      manager: 'Jane Cooper',
      managerId: 1,
      employeeCount: 42,
      budget: 2500000,
      location: 'Building A, 3rd Floor',
      createdAt: '2018-05-12'
    },
    {
      id: 2,
      name: 'Marketing',
      description: 'Handles all marketing and promotional activities.',
      manager: 'John Smith',
      managerId: 2,
      employeeCount: 18,
      budget: 1200000,
      location: 'Building B, 2nd Floor',
      createdAt: '2018-06-15'
    },
    {
      id: 3,
      name: 'Sales',
      description: 'Responsible for client acquisition and relationship management.',
      manager: 'Robert Johnson',
      managerId: 3,
      employeeCount: 24,
      budget: 1800000,
      location: 'Building B, 1st Floor',
      createdAt: '2018-07-20'
    },
    {
      id: 4,
      name: 'Human Resources',
      description: 'Manages employee relations, recruitment, and benefits.',
      manager: 'Emily Davis',
      managerId: 4,
      employeeCount: 8,
      budget: 750000,
      location: 'Building A, 2nd Floor',
      createdAt: '2018-08-10'
    },
    {
      id: 5,
      name: 'Management',
      description: 'Executive leadership and company direction.',
      manager: 'Michael Scott',
      managerId: 5,
      employeeCount: 5,
      budget: 3000000,
      location: 'Building A, 5th Floor',
      createdAt: '2018-01-01'
    },
    {
      id: 6,
      name: 'Finance',
      description: 'Handles accounting, budgeting, and financial reporting.',
      manager: 'Angela Martin',
      managerId: 6,
      employeeCount: 12,
      budget: 900000,
      location: 'Building A, 4th Floor',
      createdAt: '2018-09-05'
    },
    {
      id: 7,
      name: 'Design',
      description: 'Creates user interfaces and visual assets for products.',
      manager: 'David Miller',
      managerId: 7,
      employeeCount: 15,
      budget: 1100000,
      location: 'Building C, 1st Floor',
      createdAt: '2019-02-15'
    }
  ])

  // Mock data for employees
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: 'Jane Cooper',
      position: 'Software Engineer',
      department: 'Engineering',
      departmentId: 1,
      status: 'active',
      email: 'jane.cooper@example.com',
      hireDate: '2020-01-15'
    },
    {
      id: 2,
      name: 'John Smith',
      position: 'Marketing Specialist',
      department: 'Marketing',
      departmentId: 2,
      status: 'active',
      email: 'john.smith@example.com',
      hireDate: '2019-06-20'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      position: 'Sales Manager',
      department: 'Sales',
      departmentId: 3,
      status: 'on-leave',
      email: 'robert.johnson@example.com',
      hireDate: '2018-03-10'
    },
    {
      id: 4,
      name: 'Emily Davis',
      position: 'HR Coordinator',
      department: 'Human Resources',
      departmentId: 4,
      status: 'active',
      email: 'emily.davis@example.com',
      hireDate: '2021-02-05'
    },
    {
      id: 5,
      name: 'Michael Scott',
      position: 'Regional Manager',
      department: 'Management',
      departmentId: 5,
      status: 'active',
      email: 'michael.scott@example.com',
      hireDate: '2015-04-15'
    },
    {
      id: 6,
      name: 'Angela Martin',
      position: 'Head of Accounting',
      department: 'Finance',
      departmentId: 6,
      status: 'active',
      email: 'angela.martin@example.com',
      hireDate: '2016-08-22'
    },
    {
      id: 7,
      name: 'David Miller',
      position: 'UX Designer',
      department: 'Design',
      departmentId: 7,
      status: 'active',
      email: 'david.miller@example.com',
      hireDate: '2020-05-12'
    },
    {
      id: 8,
      name: 'Jennifer Taylor',
      position: 'Content Writer',
      department: 'Marketing',
      departmentId: 2,
      status: 'on-leave',
      email: 'jennifer.taylor@example.com',
      hireDate: '2021-01-08'
    }
  ])

  // State for view mode
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'add' | 'edit'>('list')
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtered departments
  const filteredDepartments = departments.filter(department => {
    return department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           department.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           department.manager.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Get managers for dropdown
  const managers = employees
    .filter(emp => emp.position.toLowerCase().includes('manager') || 
                  emp.position.toLowerCase().includes('director') ||
                  emp.position.toLowerCase().includes('lead'))
    .map(emp => ({ id: emp.id, name: emp.name }))

  // Get employees for a specific department
  const getDepartmentEmployees = (departmentId: number) => {
    return employees.filter(emp => emp.departmentId === departmentId)
  }

  // Handle view department details
  const handleViewDepartment = (departmentId: number) => {
    const department = departments.find(dept => dept.id === departmentId)
    if (department) {
      setSelectedDepartment(department)
      setViewMode('detail')
    }
  }

  // Handle add new department
  const handleAddDepartment = () => {
    setSelectedDepartment(null)
    setViewMode('add')
  }

  // Handle edit department
  const handleEditDepartment = (departmentId: number) => {
    const department = departments.find(dept => dept.id === departmentId)
    if (department) {
      setSelectedDepartment(department)
      setViewMode('edit')
    }
  }

  // Handle delete department
  const handleDeleteDepartment = (departmentId: number) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== departmentId))
    }
  }

  // Handle view employee from department detail
  const handleViewEmployee = (employeeId: number) => {
    // In a real app, this would navigate to the employee detail page
    alert(`Navigate to employee detail for ID: ${employeeId}`)
  }

  // Handle form submission
  const handleDepartmentFormSubmit = (formData: any) => {
    if (viewMode === 'add') {
      // Add new department
      const manager = employees.find(e => e.id === formData.managerId)
      const newDepartment: Department = {
        id: Math.max(...departments.map(d => d.id)) + 1,
        name: formData.name,
        description: formData.description,
        managerId: formData.managerId,
        manager: manager ? manager.name : '',
        employeeCount: 0,
        budget: formData.budget,
        location: formData.location,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setDepartments([...departments, newDepartment])
    } else if (viewMode === 'edit' && selectedDepartment) {
      // Update existing department
      const manager = employees.find(e => e.id === formData.managerId)
      const updatedDepartments = departments.map(dept => {
        if (dept.id === selectedDepartment.id) {
          return {
            ...dept,
            name: formData.name,
            description: formData.description,
            managerId: formData.managerId,
            manager: manager ? manager.name : dept.manager,
            budget: formData.budget,
            location: formData.location
          }
        }
        return dept
      })
      setDepartments(updatedDepartments)
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
                <h1 className="text-2xl font-semibold text-gray-900">Department Management</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage all departments in your organization
                </p>
              </div>
              <button 
                onClick={handleAddDepartment}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Department
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search departments"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Manager
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employees
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDepartments.map((department) => (
                      <tr key={department.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-800 font-medium">
                                  {department.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div 
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                onClick={() => handleViewDepartment(department.id)}
                              >
                                {department.name}
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {department.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{department.manager}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {department.employeeCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {department.location || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {department.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleEditDepartment(department.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteDepartment(department.id)}
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
            </div>
          </div>
        )
      
      case 'detail':
        return selectedDepartment ? (
          <DepartmentDetail 
            department={selectedDepartment} 
            departmentEmployees={getDepartmentEmployees(selectedDepartment.id)}
            onEdit={() => setViewMode('edit')} 
            onBack={() => setViewMode('list')}
            onViewEmployee={handleViewEmployee}
          />
        ) : null
      
      case 'add':
        return (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Add New Department</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create a new department in your organization
              </p>
            </div>
            <DepartmentForm 
              managers={managers}
              onSubmit={handleDepartmentFormSubmit}
              onCancel={() => setViewMode('list')}
            />
          </div>
        )
      
      case 'edit':
        return selectedDepartment ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Edit Department</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update department information
              </p>
            </div>
            <DepartmentForm 
              initialData={{
                name: selectedDepartment.name,
                description: selectedDepartment.description,
                managerId: selectedDepartment.managerId,
                budget: selectedDepartment.budget,
                location: selectedDepartment.location
              }}
              managers={managers}
              onSubmit={handleDepartmentFormSubmit}
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

export default DepartmentManagement
