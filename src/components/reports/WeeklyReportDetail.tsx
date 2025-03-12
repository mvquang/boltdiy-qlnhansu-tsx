import React from 'react'
import { WeeklyReport } from '../../types'
import { ArrowLeftIcon, PencilIcon, TrashIcon, CheckIcon, ClockIcon, ExclamationIcon } from '../Icons'

interface WeeklyReportDetailProps {
  report: WeeklyReport
  onEdit: () => void
  onSubmitReport: (id: number) => void
  onDelete: (id: number) => void
}

const WeeklyReportDetail: React.FC<WeeklyReportDetailProps> = ({ 
  report, 
  onEdit, 
  onSubmitReport, 
  onDelete 
}) => {
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
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
        {label}
      </span>
    )
  }

  // Render trạng thái công việc
  const renderTaskStatus = (status: string) => {
    let bgColor = ''
    let textColor = ''
    let label = ''

    switch (status) {
      case 'completed':
        bgColor = 'bg-green-100'
        textColor = 'text-green-800'
        label = 'Hoàn thành'
        break
      case 'in-progress':
        bgColor = 'bg-blue-100'
        textColor = 'text-blue-800'
        label = 'Đang thực hiện'
        break
      case 'pending':
        bgColor = 'bg-yellow-100'
        textColor = 'text-yellow-800'
        label = 'Chưa bắt đầu'
        break
      case 'cancelled':
        bgColor = 'bg-red-100'
        textColor = 'text-red-800'
        label = 'Đã hủy'
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

  // Render mức độ ưu tiên
  const renderPriority = (priority: string) => {
    let bgColor = ''
    let textColor = ''
    let label = ''

    switch (priority) {
      case 'high':
        bgColor = 'bg-red-100'
        textColor = 'text-red-800'
        label = 'Cao'
        break
      case 'medium':
        bgColor = 'bg-yellow-100'
        textColor = 'text-yellow-800'
        label = 'Trung bình'
        break
      case 'low':
        bgColor = 'bg-green-100'
        textColor = 'text-green-800'
        label = 'Thấp'
        break
      default:
        bgColor = 'bg-gray-100'
        textColor = 'text-gray-800'
        label = priority
    }

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
        {label}
      </span>
    )
  }

  // Tính toán tiến độ công việc
  const calculateProgress = () => {
    if (report.tasks.length === 0) return 0
    
    const completedTasks = report.tasks.filter(task => task.status === 'completed').length
    return Math.round((completedTasks / report.tasks.length) * 100)
  }

  // Tính tổng thời gian
  const calculateTotalHours = (type: 'estimated' | 'actual') => {
    return report.tasks.reduce((total, task) => {
      return total + (type === 'estimated' ? task.estimatedHours : task.actualHours)
    }, 0)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Báo cáo tuần {report.weekNumber}, {report.year}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {report.startDate} - {report.endDate}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {renderStatus(report.status)}
          
          {report.status === 'draft' && (
            <>
              <button
                onClick={onEdit}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon />
                <span className="ml-1">Chỉnh sửa</span>
              </button>
              <button
                onClick={() => onSubmitReport(report.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <CheckIcon />
                <span className="ml-1">Nộp báo cáo</span>
              </button>
              <button
                onClick={() => onDelete(report.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon />
                <span className="ml-1">Xóa</span>
              </button>
            </>
          )}
          
          {report.status === 'rejected' && (
            <button
              onClick={onEdit}
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon />
              <span className="ml-1">Chỉnh sửa</span>
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Tổng quan</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Tiến độ</div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{calculateProgress()}% hoàn thành</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Thời gian dự kiến</div>
                <div className="mt-2 flex items-center">
                  <ClockIcon />
                  <div className="ml-2 text-lg font-semibold text-gray-900">{calculateTotalHours('estimated')} giờ</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500">Thời gian thực tế</div>
                <div className="mt-2 flex items-center">
                  <ClockIcon />
                  <div className="ml-2 text-lg font-semibold text-gray-900">{calculateTotalHours('actual')} giờ</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Danh sách công việc</h4>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Mô tả</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ưu tiên</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Thời gian dự kiến</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Thời gian thực tế</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {report.tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {task.description}
                        {task.comments && (
                          <p className="mt-1 text-xs text-gray-500">{task.comments}</p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {renderTaskStatus(task.status)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {renderPriority(task.priority)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.estimatedHours} giờ
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task.actualHours} giờ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-2">Kế hoạch tuần tới</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {report.nextWeekPlan || 'Chưa có kế hoạch'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-2">Khó khăn gặp phải</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {report.challenges || 'Không có khó khăn'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-2">Thành tựu đạt được</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {report.achievements || 'Chưa có thành tựu'}
              </p>
            </div>
          </div>

          {report.status !== 'draft' && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-2">Thông tin nộp báo cáo</h4>
              <div className="text-sm text-gray-700">
                <p>Thời gian nộp: {report.submittedAt ? new Date(report.submittedAt).toLocaleString('vi-VN') : 'Chưa nộp'}</p>
                {report.reviewedAt && (
                  <>
                    <p className="mt-1">Thời gian duyệt: {new Date(report.reviewedAt).toLocaleString('vi-VN')}</p>
                    <p className="mt-1">Người duyệt: {report.reviewedBy}</p>
                  </>
                )}
                {report.comments && (
                  <div className="mt-2">
                    <p className="font-medium">Nhận xét:</p>
                    <p className="mt-1 whitespace-pre-line">{report.comments}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeeklyReportDetail
