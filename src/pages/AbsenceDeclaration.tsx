import React, { useState, useEffect } from 'react'
import { AbsenceDeclaration as AbsenceDeclarationType } from '../types'
import AbsenceDeclarationList from '../components/absence/AbsenceDeclarationList'
import AbsenceDeclarationForm from '../components/absence/AbsenceDeclarationForm'
import AbsenceDeclarationDetail from '../components/absence/AbsenceDeclarationDetail'

const AbsenceDeclaration: React.FC = () => {
  const [view, setView] = useState<'list' | 'create' | 'detail' | 'edit'>('list')
  const [declarations, setDeclarations] = useState<AbsenceDeclarationType[]>([])
  const [currentDeclaration, setCurrentDeclaration] = useState<AbsenceDeclarationType | null>(null)
  const [currentEmployeeId] = useState<number>(1) // Giả định ID nhân viên đang đăng nhập

  // Mock data cho khai báo vắng mặt
  useEffect(() => {
    const mockDeclarations: AbsenceDeclarationType[] = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'Nguyễn Văn A',
        date: '2023-09-15',
        startTime: '09:00',
        endTime: '11:30',
        reason: 'maintenance',
        location: 'Phòng Marketing - Tầng 3',
        description: 'Bảo trì máy tính cho nhân viên phòng Marketing',
        status: 'approved',
        approvedBy: 'Trần Văn B',
        approverId: 5,
        approvedAt: '2023-09-14T15:30:00',
        comments: 'Đã duyệt'
      },
      {
        id: 2,
        employeeId: 1,
        employeeName: 'Nguyễn Văn A',
        date: '2023-09-18',
        startTime: '14:00',
        endTime: '17:00',
        reason: 'network',
        location: 'Phòng Kế toán - Tầng 2',
        description: 'Kéo mạng cho máy tính mới',
        status: 'pending',
        comments: ''
      },
      {
        id: 3,
        employeeId: 1,
        employeeName: 'Nguyễn Văn A',
        date: '2023-09-20',
        startTime: '10:00',
        endTime: '12:00',
        reason: 'wifi',
        location: 'Phòng họp - Tầng 5',
        description: 'Sửa chữa wifi bị lỗi',
        status: 'rejected',
        approvedBy: 'Trần Văn B',
        approverId: 5,
        approvedAt: '2023-09-19T09:15:00',
        comments: 'Thời gian trùng với cuộc họp quan trọng, vui lòng chọn thời gian khác'
      }
    ]

    setDeclarations(mockDeclarations)
  }, [])

  // Xử lý tạo khai báo mới
  const handleCreateDeclaration = (declarationData: any) => {
    const newDeclaration: AbsenceDeclarationType = {
      id: declarations.length + 1,
      employeeId: currentEmployeeId,
      employeeName: 'Nguyễn Văn A', // Giả định tên nhân viên
      date: declarationData.date,
      startTime: declarationData.startTime,
      endTime: declarationData.endTime,
      reason: declarationData.reason,
      location: declarationData.location,
      description: declarationData.description,
      status: 'pending'
    }

    setDeclarations([...declarations, newDeclaration])
    setCurrentDeclaration(newDeclaration)
    setView('detail')
  }

  // Xử lý cập nhật khai báo
  const handleUpdateDeclaration = (declarationData: any) => {
    if (!currentDeclaration) return

    const updatedDeclaration: AbsenceDeclarationType = {
      ...currentDeclaration,
      date: declarationData.date,
      startTime: declarationData.startTime,
      endTime: declarationData.endTime,
      reason: declarationData.reason,
      location: declarationData.location,
      description: declarationData.description
    }

    setDeclarations(declarations.map(declaration => 
      declaration.id === currentDeclaration.id ? updatedDeclaration : declaration
    ))
    setCurrentDeclaration(updatedDeclaration)
    setView('detail')
  }

  // Xử lý xóa khai báo
  const handleDeleteDeclaration = (declarationId: number) => {
    setDeclarations(declarations.filter(declaration => declaration.id !== declarationId))
    setView('list')
  }

  // Xử lý xem chi tiết khai báo
  const handleViewDeclaration = (declarationId: number) => {
    const declaration = declarations.find(d => d.id === declarationId)
    if (declaration) {
      setCurrentDeclaration(declaration)
      setView('detail')
    }
  }

  // Xử lý chỉnh sửa khai báo
  const handleEditDeclaration = (declarationId: number) => {
    const declaration = declarations.find(d => d.id === declarationId)
    if (declaration) {
      setCurrentDeclaration(declaration)
      setView('edit')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Khai báo vắng mặt tại phòng làm việc
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Dành cho nhân viên IT khi đi bảo trì máy tính, kéo mạng, sửa chữa wifi
          </p>
        </div>
        {view === 'list' && (
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => {
                setCurrentDeclaration(null)
                setView('create')
              }}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tạo khai báo mới
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
        <AbsenceDeclarationList 
          declarations={declarations} 
          onView={handleViewDeclaration}
          onEdit={handleEditDeclaration}
          onDelete={handleDeleteDeclaration}
        />
      )}

      {view === 'create' && (
        <AbsenceDeclarationForm 
          onSubmit={handleCreateDeclaration}
          onCancel={() => setView('list')}
        />
      )}

      {view === 'edit' && currentDeclaration && (
        <AbsenceDeclarationForm 
          declaration={currentDeclaration}
          onSubmit={handleUpdateDeclaration}
          onCancel={() => setView('detail')}
        />
      )}

      {view === 'detail' && currentDeclaration && (
        <AbsenceDeclarationDetail 
          declaration={currentDeclaration}
          onEdit={() => setView('edit')}
          onDelete={handleDeleteDeclaration}
        />
      )}
    </div>
  )
}

export default AbsenceDeclaration
