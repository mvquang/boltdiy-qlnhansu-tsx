import React, { useState, useEffect } from 'react'
import { Employee } from '../types'

const EmployeeProfile: React.FC = () => {
  // Mock data for current employee
  const [employee, setEmployee] = useState<Employee>({
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
  })

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(employee)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for departments and managers
  const departments = [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Sales' },
    { id: 4, name: 'Human Resources' },
    { id: 5, name: 'Management' },
    { id: 6, name: 'Finance' },
    { id: 7, name: 'Design' }
  ]

  const managers = [
    { id: 5, name: 'Michael Scott' },
    { id: 6, name: 'Angela Martin' }
  ]

  // Mock data for employee history
  const employeeHistory = [
    { 
      id: 1, 
      type: 'position_change', 
      from: 'Junior Developer', 
      to: 'Software Engineer', 
      date: '2021-06-15',
      approvedBy: 'Michael Scott'
    },
    { 
      id: 2, 
      type: 'department_change', 
      from: 'Product', 
      to: 'Engineering', 
      date: '2021-06-15',
      approvedBy: 'Michael Scott'
    },
    { 
      id: 3, 
      type: 'salary_change', 
      from: '$75,000', 
      to: '$85,000', 
      date: '2021-06-15',
      approvedBy: 'Angela Martin'
    },
    { 
      id: 4, 
      type: 'leave', 
      status: 'approved', 
      from: '2021-12-20', 
      to: '2021-12-31',
      reason: 'Annual leave',
      approvedBy: 'Michael Scott'
    }
  ]

  // Mock data for performance reviews
  const performanceReviews = [
    {
      id: 1,
      date: '2021-12-01',
      reviewer: 'Michael Scott',
      rating: 4.5,
      strengths: 'Technical skills, problem-solving, teamwork',
      areasForImprovement: 'Communication with non-technical stakeholders',
      goals: 'Improve documentation, mentor junior developers',
      comments: 'Jane has been an exceptional team member and consistently delivers high-quality work.'
    },
    {
      id: 2,
      date: '2020-12-05',
      reviewer: 'Michael Scott',
      rating: 4.2,
      strengths: 'Code quality, technical knowledge, reliability',
      areasForImprovement: 'Project estimation, work-life balance',
      goals: 'Take on more leadership responsibilities',
      comments: 'Jane has grown significantly in her role this year and is becoming a key team member.'
    }
  ]

  // Mock data for documents
  const documents = [
    { id: 1, name: 'Employment Contract', type: 'PDF', uploadDate: '2020-01-10', size: '2.4 MB' },
    { id: 2, name: 'Resume', type: 'PDF', uploadDate: '2020-01-05', size: '1.8 MB' },
    { id: 3, name: 'Emergency Contact Form', type: 'PDF', uploadDate: '2020-01-15', size: '0.5 MB' },
    { id: 4, name: 'Performance Review 2020', type: 'PDF', uploadDate: '2020-12-10', size: '1.2 MB' },
    { id: 5, name: 'Performance Review 2021', type: 'PDF', uploadDate: '2021-12-05', size: '1.3 MB' }
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'departmentId' || name === 'managerId' || name === 'salary'
        ? Number(value)
        : value
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmployee({
      ...formData,
      department: departments.find(d => d.id === formData.departmentId)?.name || '',
      manager: managers.find(m => m.id === formData.managerId)?.name || ''
    })
    setIsEditing(false)
  }

  // Reset form data when employee changes
  useEffect(() => {
    setFormData(employee)
  }, [employee])

  // Render status badge
  const renderStatusBadge = (status: string) => {
    let bgColor = ''
    let textColor = ''
    let label = ''

    switch (status) {
      case 'active':
        bgColor = 'bg-green-100'
        textColor = 'text-green-800'
        label = 'Active'
        break
      case 'on-leave':
        bgColor = 'bg-yellow-100'
        textColor = 'text-yellow-800'
        label = 'On Leave'
        break
      case 'terminated':
        bgColor = 'bg-red-100'
        textColor = 'text-red-800'
        label = 'Terminated'
        break
      default:
        bgColor = 'bg-gray-100'
        textColor = 'text-gray-800'
        label = status
    }

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
        {label}
      </span>
    )
  }

  // Render history item
  const renderHistoryItem = (item: any) => {
    let icon = ''
    let title = ''
    let details = ''
    let bgColor = ''

    switch (item.type) {
      case 'position_change':
        icon = '👔'
        title = 'Position Change'
        details = `Changed from ${item.from} to ${item.to}`
        bgColor = 'bg-blue-50'
        break
      case 'department_change':
        icon = '🏢'
        title = 'Department Transfer'
        details = `Transferred from ${item.from} to ${item.to}`
        bgColor = 'bg-purple-50'
        break
      case 'salary_change':
        icon = '💰'
        title = 'Salary Adjustment'
        details = `Adjusted from ${item.from} to ${item.to}`
        bgColor = 'bg-green-50'
        break
      case 'leave':
        icon = '🗓️'
        title = 'Leave'
        details = `${item.reason} from ${item.from} to ${item.to}`
        bgColor = 'bg-yellow-50'
        break
      default:
        icon = '📝'
        title = 'Update'
        details = 'Employee information updated'
        bgColor = 'bg-gray-50'
    }

    return (
      <li key={item.id} className={`${bgColor} p-4 rounded-lg mb-3`}>
        <div className="flex items-center">
          <div className="text-2xl mr-3">{icon}</div>
          <div className="flex-1">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-gray-600">{details}</div>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <span>{item.date}</span>
              <span className="mx-1">•</span>
              <span>Approved by {item.approvedBy}</span>
            </div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Thông tin nhân viên
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Chỉnh sửa
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-700 mr-4">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {employee.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {employee.position} • {employee.department}
              </p>
              <div className="mt-1">
                {renderStatusBadge(employee.status)}
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                className={`${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('overview')}
              >
                Tổng quan
              </button>
              <button
                className={`${
                  activeTab === 'history'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('history')}
              >
                Lịch sử
              </button>
              <button
                className={`${
                  activeTab === 'performance'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('performance')}
              >
                Đánh giá
              </button>
              <button
                className={`${
                  activeTab === 'documents'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('documents')}
              >
                Tài liệu
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="px-4 py-5 sm:p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Họ và tên
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                      Chức vụ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="position"
                        id="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
                      Phòng ban
                    </label>
                    <div className="mt-1">
                      <select
                        id="departmentId"
                        name="departmentId"
                        value={formData.departmentId}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700">
                      Ngày vào làm
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="hireDate"
                        id="hireDate"
                        value={formData.hireDate}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Trạng thái
                    </label>
                    <div className="mt-1">
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="active">Đang làm việc</option>
                        <option value="on-leave">Nghỉ phép</option>
                        <option value="terminated">Đã nghỉ việc</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="managerId" className="block text-sm font-medium text-gray-700">
                      Quản lý
                    </label>
                    <div className="mt-1">
                      <select
                        id="managerId"
                        name="managerId"
                        value={formData.managerId || ''}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Không có quản lý</option>
                        {managers.map(manager => (
                          <option key={manager.id} value={manager.id}>
                            {manager.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Địa chỉ
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                      Lương (VNĐ)
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="salary"
                        id="salary"
                        value={formData.salary || ''}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin cá nhân</h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
                      <dd className="mt-1 text-sm text-gray-900">{employee.name}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
                      <dd className="mt-1 text-sm text-gray-900">{employee.phone || 'Chưa cập nhật'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Địa chỉ</dt>
                      <dd className="mt-1 text-sm text-gray-900">{employee.address || 'Chưa cập nhật'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin công việc</h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Chức vụ</dt>
                      <dd className="mt-1 text-sm text-gray-900">{employee.position}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Phòng ban</dt>
                      <dd className="mt-1 text-sm text-gray-900">{employee.department}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Quản lý</dt>
                      <dd className="mt-1 text-sm text-gray-900">{employee.manager || 'Không có'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Ngày vào làm</dt>
                      <dd className="mt-1 text-sm text-gray-900">{employee.hireDate}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Trạng thái</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {renderStatusBadge(employee.status)}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Lương</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {employee.salary ? `${employee.salary.toLocaleString()} VNĐ` : 'Chưa cập nhật'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="md:col-span-2 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin bổ sung</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm font-medium text-gray-500">Ngày làm việc</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">731</div>
                      <div className="text-xs text-gray-500">Từ ngày vào làm</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm font-medium text-gray-500">Ngày nghỉ phép còn lại</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">12</div>
                      <div className="text-xs text-gray-500">Trong năm 2023</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-sm font-medium text-gray-500">Đánh giá gần nhất</div>
                      <div className="mt-1 text-2xl font-semibold text-gray-900">4.5/5</div>
                      <div className="text-xs text-gray-500">Tháng 12/2021</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Lịch sử thay đổi</h3>
            <ul className="space-y-3">
              {employeeHistory.map(item => renderHistoryItem(item))}
            </ul>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Đánh giá hiệu suất</h3>
            <div className="space-y-6">
              {performanceReviews.map(review => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-md font-medium text-gray-900">Đánh giá ngày {review.date}</h4>
                      <p className="text-sm text-gray-500">Người đánh giá: {review.reviewer}</p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {review.rating}/5
                    </div>
                  </div>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Điểm mạnh</dt>
                      <dd className="mt-1 text-sm text-gray-900">{review.strengths}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Cần cải thiện</dt>
                      <dd className="mt-1 text-sm text-gray-900">{review.areasForImprovement}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Mục tiêu</dt>
                      <dd className="mt-1 text-sm text-gray-900">{review.goals}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Nhận xét</dt>
                      <dd className="mt-1 text-sm text-gray-900">{review.comments}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Tài liệu</h3>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tải lên tài liệu
              </button>
            </div>
            <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên tài liệu
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loại
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tải lên
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kích thước
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Tải xuống</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((document) => (
                    <tr key={document.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center">
                            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{document.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{document.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{document.uploadDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {document.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900">Tải xuống</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeProfile
