import React from 'react'
import { AbsenceDeclaration } from '../../types'
import { PencilIcon, TrashIcon } from '../Icons'

interface AbsenceDeclarationDetailProps {
  declaration: AbsenceDeclaration
  onEdit: () => void
  onDelete: (id: number) => void
}

const AbsenceDeclarationDetail: React.FC<AbsenceDeclarationDetailProps> = ({ 
  declaration, 
  onEdit, 
  onDelete 
}) => {
  // Render trạng thái khai báo
  const renderStatus = (status: string) => {
    let bgColor = ''
    let textColor = ''
    let label = ''

    switch (status) {
      case 'pending':
        bgColor = 'bg-yellow-100'
        textColor = 'text-yellow-800'
        label = 'Chờ duyệt'
        break
      case 'approved':
        bgColor = 'bg-green-100'
        textColor = 'text-green-800'
        label = 'Đã duyệt'
        break
      case 'rejected':
        bgColor = 'bg-red-100'
        textColor = 'text-red-800'
        label = 'Từ chối'
        break
      default:
        bgColor = 'bg-gray-100'
        textColor = 'text-gray-800'
        label = status
    }

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
        {label}
      </span>
    )
  }

  // Render lý do vắng mặt
  const renderReason = (reason: string) => {
    let label = ''

    switch (reason) {
      case 'maintenance':
        label = 'Bảo trì máy tính'
        break
      case 'network':
        label = 'Kéo mạng'
        break
      case 'wifi':
        label = 'Sửa chữa wifi'
        break
      case 'other':
        label = 'Khác'
        break
      default:
        label = reason
    }

    return label
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Chi tiết khai báo vắng mặt
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {renderReason(declaration.reason)}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {renderStatus(declaration.status)}
          
          {declaration.status === 'pending' && (
            <>
              <button
                onClick={onEdit}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon />
                <span className="ml-1">Chỉnh sửa</span>
              </button>
              <button
                onClick={() => onDelete(declaration.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon />
                <span className="ml-1">Xóa</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nhân viên</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{declaration.employeeName}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Ngày</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{declaration.date}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Thời gian</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {declaration.startTime} - {declaration.endTime}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Lý do vắng mặt</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{renderReason(declaration.reason)}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Địa điểm</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{declaration.location}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Mô tả chi tiết</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{declaration.description}</dd>
          </div>
          
          {declaration.status !== 'pending' && (
            <>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Người duyệt</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{declaration.approvedBy || 'Chưa có'}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Thời gian duyệt</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {declaration.approvedAt ? new Date(declaration.approvedAt).toLocaleString('vi-VN') : 'Chưa có'}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Nhận xét</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{declaration.comments || 'Không có'}</dd>
              </div>
            </>
          )}
        </dl>
      </div>
    </div>
  )
}

export default AbsenceDeclarationDetail
