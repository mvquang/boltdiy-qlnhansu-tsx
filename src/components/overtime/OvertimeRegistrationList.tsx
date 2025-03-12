import React from 'react'
import { OvertimeRegistration } from '../../types'
import { EyeIcon, PencilIcon, TrashIcon } from '../Icons'

interface OvertimeRegistrationListProps {
  registrations: OvertimeRegistration[]
  onView: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const OvertimeRegistrationList: React.FC<OvertimeRegistrationListProps> = ({ 
  registrations, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  // Sắp xếp đăng ký theo thời gian mới nhất
  const sortedRegistrations = [...registrations].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Render trạng thái đăng ký
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

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {sortedRegistrations.length > 0 ? (
          sortedRegistrations.map((registration) => (
            <li key={registration.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {registration.reason}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      {renderStatus(registration.status)}
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button
                      onClick={() => onView(registration.id)}
                      className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <EyeIcon />
                    </button>
                    {registration.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onEdit(registration.id)}
                          className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <PencilIcon />
                        </button>
                        <button
                          onClick={() => onDelete(registration.id)}
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
                      Ngày: {registration.date}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Thời gian: {registration.startTime} - {registration.endTime}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>Tổng thời gian: {registration.totalHours} giờ</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <p className="truncate">{registration.tasks}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-5 sm:px-6">
            <div className="text-center text-gray-500">
              Chưa có đăng ký làm thêm giờ nào. Hãy tạo đăng ký mới!
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default OvertimeRegistrationList
