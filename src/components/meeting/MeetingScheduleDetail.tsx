import React from 'react'
import { MeetingSchedule } from '../../types'
import { PencilIcon, TrashIcon, CheckIcon, XIcon } from '../Icons'

interface MeetingScheduleDetailProps {
  meeting: MeetingSchedule
  onEdit: () => void
  onDelete: (id: number) => void
  onCancel: (id: number) => void
  onConfirmAttendance: (id: number, confirm: boolean) => void
  currentEmployeeId: number
}

const MeetingScheduleDetail: React.FC<MeetingScheduleDetailProps> = ({ 
  meeting, 
  onEdit, 
  onDelete,
  onCancel,
  onConfirmAttendance,
  currentEmployeeId
}) => {
  // Render trạng thái cuộc họp
  const renderStatus = (status: string) => {
    let bgColor = ''
    let textColor = ''
    let label = ''

    switch (status) {
      case 'scheduled':
        bgColor = 'bg-blue-100'
        textColor = 'text-blue-800'
        label = 'Đã lên lịch'
        break
      case 'cancelled':
        bgColor = 'bg-red-100'
        textColor = 'text-red-800'
        label = 'Đã hủy'
        break
      case 'completed':
        bgColor = 'bg-green-100'
        textColor = 'text-green-800'
        label = 'Đã hoàn thành'
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

  // Render loại cuộc họp
  const renderMeetingType = (type: string) => {
    let label = ''

    switch (type) {
      case 'team':
        label = 'Họp đội'
        break
      case 'project':
        label = 'Họp dự án'
        break
      case 'client':
        label = 'Họp khách hàng'
        break
      case 'other':
        label = 'Khác'
        break
      default:
        label = type
    }

    return label
  }

  // Kiểm tra xem người dùng hiện tại có phải là người tổ chức không
  const isOrganizer = () => {
    return meeting.organizer.id === currentEmployeeId
  }

  // Kiểm tra xem người dùng hiện tại có phải là người tham gia không
  const isParticipant = () => {
    return meeting.participants.some(p => p.id === currentEmployeeId)
  }

  // Lấy trạng thái xác nhận tham gia của người dùng hiện tại
  const getConfirmationStatus = () => {
    const participant = meeting.participants.find(p => p.id === currentEmployeeId)
    return participant ? participant.confirmed : false
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {meeting.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {renderMeetingType(meeting.meetingType)}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {renderStatus(meeting.status)}
          
          {meeting.status === 'scheduled' && isOrganizer() && (
            <>
              <button
                onClick={onEdit}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon />
                <span className="ml-1">Chỉnh sửa</span>
              </button>
              <button
                onClick={() => onCancel(meeting.id)}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <XIcon />
                <span className="ml-1">Hủy lịch họp</span>
              </button>
              <button
                onClick={() => onDelete(meeting.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon />
                <span className="ml-1">Xóa</span>
              </button>
            </>
          )}
          
          {meeting.status === 'scheduled' && isParticipant() && !isOrganizer() && (
            <div className="flex space-x-2">
              {getConfirmationStatus() ? (
                <button
                  onClick={() => onConfirmAttendance(meeting.id, false)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <XIcon />
                  <span className="ml-1">Từ chối tham gia</span>
                </button>
              ) : (
                <button
                  onClick={() => onConfirmAttendance(meeting.id, true)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <CheckIcon />
                  <span className="ml-1">Xác nhận tham gia</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Người tổ chức</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{meeting.organizer.name}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Ngày</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{meeting.date}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Thời gian</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {meeting.startTime} - {meeting.endTime}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Địa điểm</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{meeting.location}</dd>
          </div>
          
          {meeting.meetingLink && (
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Link cuộc họp</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                  {meeting.meetingLink}
                </a>
              </dd>
            </div>
          )}
          
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">{meeting.description}</dd>
          </div>
          
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Người tham gia ({meeting.participants.length})</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {meeting.participants.map((participant) => (
                  <li key={participant.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">{participant.name}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {participant.confirmed ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Đã xác nhận
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Chưa xác nhận
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default MeetingScheduleDetail
