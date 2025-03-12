import React, { useState, useEffect } from 'react'
import { OvertimeRegistration as OvertimeRegistrationType } from '../types'
import OvertimeRegistrationList from '../components/overtime/OvertimeRegistrationList'
import OvertimeRegistrationForm from '../components/overtime/OvertimeRegistrationForm'
import OvertimeRegistrationDetail from '../components/overtime/OvertimeRegistrationDetail'

const OvertimeRegistration: React.FC = () => {
  const [view, setView] = useState<'list' | 'create' | 'detail' | 'edit'>('list')
  const [registrations, setRegistrations] = useState<OvertimeRegistrationType[]>([])
  const [currentRegistration, setCurrentRegistration] = useState<OvertimeRegistrationType | null>(null)
  const [currentEmployeeId] = useState<number>(1) // Giả định ID nhân viên đang đăng nhập

  // Mock data cho đăng ký làm thêm giờ
  useEffect(() => {
    const mockRegistrations: OvertimeRegistrationType[] = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'Nguyễn Văn A',
        date: '2023-09-15',
        startTime: '18:00',
        endTime: '21:00',
        reason: 'Hoàn thành báo cáo cuối tháng',
        tasks: 'Tổng hợp số liệu\nPhân tích dữ liệu\nViết báo cáo',
        status: 'approved',
        approvedBy: 'Trần Văn B',
        approverId: 5,
        approvedAt: '2023-09-14T15:30:00',
        comments: 'Đã duyệt',
        totalHours: 3
      },
      {
        id: 2,
        employeeId: 1,
        employeeName: 'Nguyễn Văn A',
        date: '2023-09-18',
        startTime: '18:00',
        endTime: '20:00',
        reason: 'Fix lỗi hệ thống gấp',
        tasks: 'Sửa lỗi đăng nhập\nKiểm tra bảo mật',
        status: 'pending',
        comments: '',
        totalHours: 2
      },
      {
        id: 3,
        employeeId: 1,
        employeeName: 'Nguyễn Văn A',
        date: '2023-09-20',
        startTime: '18:00',
        endTime: '22:00',
        reason: 'Chuẩn bị demo cho khách hàng',
        tasks: 'Hoàn thiện tính năng mới\nChuẩn bị slide trình bày\nTest demo',
        status: 'rejected',
        approvedBy: 'Trần Văn B',
        approverId: 5,
        approvedAt: '2023-09-19T09:15:00',
        comments: 'Không cần thiết làm thêm giờ, có thể hoàn thành trong giờ làm việc',
        totalHours: 4
      }
    ]

    setRegistrations(mockRegistrations)
  }, [])

  // Tính toán số giờ làm thêm
  const calculateTotalHours = (startTime: string, endTime: string): number => {
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    const diffMs = end.getTime() - start.getTime()
    return Math.round(diffMs / (1000 * 60 * 60) * 10) / 10 // Làm tròn đến 1 chữ số thập phân
  }

  // Xử lý tạo đăng ký mới
  const handleCreateRegistration = (registrationData: any) => {
    const totalHours = calculateTotalHours(registrationData.startTime, registrationData.endTime)
    
    const newRegistration: OvertimeRegistrationType = {
      id: registrations.length + 1,
      employeeId: currentEmployeeId,
      employeeName: 'Nguyễn Văn A', // Giả định tên nhân viên
      date: registrationData.date,
      startTime: registrationData.startTime,
      endTime: registrationData.endTime,
      reason: registrationData.reason,
      tasks: registrationData.tasks,
      status: 'pending',
      totalHours
    }

    setRegistrations([...registrations, newRegistration])
    setCurrentRegistration(newRegistration)
    setView('detail')
  }

  // Xử lý cập nhật đăng ký
  const handleUpdateRegistration = (registrationData: any) => {
    if (!currentRegistration) return

    const totalHours = calculateTotalHours(registrationData.startTime, registrationData.endTime)
    
    const updatedRegistration: OvertimeRegistrationType = {
      ...currentRegistration,
      date: registrationData.date,
      startTime: registrationData.startTime,
      endTime: registrationData.endTime,
      reason: registrationData.reason,
      tasks: registrationData.tasks,
      totalHours
    }

    setRegistrations(registrations.map(registration => 
      registration.id === currentRegistration.id ? updatedRegistration : registration
    ))
    setCurrentRegistration(updatedRegistration)
    setView('detail')
  }

  // Xử lý xóa đăng ký
  const handleDeleteRegistration = (registrationId: number) => {
    setRegistrations(registrations.filter(registration => registration.id !== registrationId))
    setView('list')
  }

  // Xử lý xem chi tiết đăng ký
  const handleViewRegistration = (registrationId: number) => {
    const registration = registrations.find(r => r.id === registrationId)
    if (registration) {
      setCurrentRegistration(registration)
      setView('detail')
    }
  }

  // Xử lý chỉnh sửa đăng ký
  const handleEditRegistration = (registrationId: number) => {
    const registration = registrations.find(r => r.id === registrationId)
    if (registration) {
      setCurrentRegistration(registration)
      setView('edit')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Đăng ký làm thêm giờ
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Đăng ký làm thêm giờ ngoài giờ hành chính
          </p>
        </div>
        {view === 'list' && (
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => {
                setCurrentRegistration(null)
                setView('create')
              }}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tạo đăng ký mới
            </button>
          </div>
        )}
        {view !== 'list' && (
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => setView('list')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Quay lại danh sách
            </button>
          </div>
        )}
      </div>

      {view === 'list' && (
        <OvertimeRegistrationList 
          registrations={registrations} 
          onView={handleViewRegistration}
          onEdit={handleEditRegistration}
          onDelete={handleDeleteRegistration}
        />
      )}

      {view === 'create' && (
        <OvertimeRegistrationForm 
          onSubmit={handleCreateRegistration}
          onCancel={() => setView('list')}
        />
      )}

      {view === 'edit' && currentRegistration && (
        <OvertimeRegistrationForm 
          registration={currentRegistration}
          onSubmit={handleUpdateRegistration}
          onCancel={() => setView('detail')}
        />
      )}

      {view === 'detail' && currentRegistration && (
        <OvertimeRegistrationDetail 
          registration={currentRegistration}
          onEdit={() => setView('edit')}
          onDelete={handleDeleteRegistration}
        />
      )}
    </div>
  )
}

export default OvertimeRegistration
