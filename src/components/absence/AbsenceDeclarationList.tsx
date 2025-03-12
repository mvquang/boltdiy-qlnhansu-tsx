import React from 'react'
import { AbsenceDeclaration } from '../../types'
import { EyeIcon, PencilIcon, TrashIcon } from '../Icons'

interface AbsenceDeclarationListProps {
  declarations: AbsenceDeclaration[]
  onView: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const AbsenceDeclarationList: React.FC<AbsenceDeclarationListProps> = ({ 
  declarations, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  // Sắp xếp khai báo theo thời gian mới nhất
  const sortedDeclarations = [...declarations].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

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
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
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
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {sortedDeclarations.length > 0 ? (
          sortedDeclarations.map((declaration) => (
            <li key={declaration.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {renderReason(declaration.reason)}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      {renderStatus(declaration.status)}
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button
                      onClick={() => onView(declaration.id)}
                      className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <EyeIcon />
                    </button>
                    {declaration.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onEdit(declaration.id)}
                          className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <PencilIcon />
                        </button>
                        <button
                          onClick={() => onDelete(declaration.id)}
                          className="p-1 rounded-full text-gray-500 hover:text-red-700 focus:outline-none"
                        >
                          <TrashIcon />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Ngày: {declaration.date}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Thời gian: {declaration.startTime} - {declaration.endTime}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>Địa điểm: {declaration.location}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p className="truncate">{declaration.description}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-5 sm:px-6">
            <div className="text-center text-gray-500">
              Chưa có khai báo vắng mặt nào. Hãy tạo khai báo mới!
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AbsenceDeclarationList
