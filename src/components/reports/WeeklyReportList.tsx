import React from 'react'
import { WeeklyReport } from '../../types'
import { EyeIcon, PencilIcon, TrashIcon } from '../Icons'

interface WeeklyReportListProps {
  reports: WeeklyReport[]
  onView: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const WeeklyReportList: React.FC<WeeklyReportListProps> = ({ 
  reports, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  // Sắp xếp báo cáo theo thời gian mới nhất
  const sortedReports = [...reports].sort((a, b) => {
    // Sắp xếp theo năm giảm dần
    if (a.year !== b.year) return b.year - a.year
    // Nếu cùng năm, sắp xếp theo tuần giảm dần
    return b.weekNumber - a.weekNumber
  })

  // Render trạng thái báo cáo
  const renderStatus = (status: string) => {
    let bgColor = ''
    let textColor = ''
    let label = ''

    switch (status) {
      case 'draft':
        bgColor = 'bg-gray-100'
        textColor = 'text-gray-800'
        label = 'Bản nháp'
        break
      case 'submitted':
        bgColor = 'bg-blue-100'
        textColor = 'text-blue-800'
        label = 'Đã nộp'
        break
      case 'reviewed':
        bgColor = 'bg-yellow-100'
        textColor = 'text-yellow-800'
        label = 'Đã xem xét'
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

  // Tính toán tiến độ công việc
  const calculateProgress = (report: WeeklyReport) => {
    if (report.tasks.length === 0) return 0
    
    const completedTasks = report.tasks.filter(task => task.status === 'completed').length
    return Math.round((completedTasks / report.tasks.length) * 100)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {sortedReports.length > 0 ? (
          sortedReports.map((report) => (
            <li key={report.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      Tuần {report.weekNumber}, {report.year}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      {renderStatus(report.status)}
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button
                      onClick={() => onView(report.id)}
                      className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <EyeIcon />
                    </button>
                    {(report.status === 'draft' || report.status === 'rejected') && (
                      <button
                        onClick={() => onEdit(report.id)}
                        className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <PencilIcon />
                      </button>
                    )}
                    {report.status === 'draft' && (
                      <button
                        onClick={() => onDelete(report.id)}
                        className="p-1 rounded-full text-gray-500 hover:text-red-700 focus:outline-none"
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {report.startDate} - {report.endDate}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {report.tasks.length} công việc
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${calculateProgress(report)}%` }}
                      ></div>
                    </div>
                    <span>{calculateProgress(report)}% hoàn thành</span>
                  </div>
                </div>
                {report.submittedAt && (
                  <div className="mt-2 text-sm text-gray-500">
                    Đã nộp: {new Date(report.submittedAt).toLocaleString('vi-VN')}
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-5 sm:px-6">
            <div className="text-center text-gray-500">
              Chưa có báo cáo nào. Hãy tạo báo cáo mới!
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default WeeklyReportList
