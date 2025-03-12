import React from 'react'
import { MeetingSchedule } from '../../types'
import { EyeIcon, PencilIcon, TrashIcon, CheckIcon, XIcon } from '../Icons'

interface MeetingScheduleListProps {
  meetings: MeetingSchedule[]
  onView: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onCancel: (id: number) => void
  onConfirmAttendance: (id: number, confirm: boolean) => void
  currentEmployeeId: number
}

const MeetingScheduleList: React.FC<MeetingScheduleListProps> = ({ 
  meetings, 
  onView, 
  onEdit, 
  onDelete,
  onCancel,
  onConfirmAttendance,
  currentEmployeeId
}) => {
  // Sắp xếp lịch họp theo thời gian gần nhất
  const sortedMeetings = [...meetings].sort((a, b) => {
    // Sắp xếp theo ngày
    const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime()
    if (dateComparison !== 0) return dateComparison
    
    // Nếu cùng ngày, sắp xếp theo giờ bắt đầu
    return a.startTime.localeCompare(b.startTime)
  })

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
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
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
  const isOrganizer = (meeting: MeetingSchedule) => {
    return meeting.organizer.id === currentEmployeeId
  }

  // Kiểm tra xem người dùng hiện tại có phải là người tham gia không
  const isParticipant = (meeting: MeetingSchedule) => {
    return meeting.participants.some(p => p.id === currentEmployeeId)
  }

  // Lấy trạng thái xác nhận tham gia của người dùng hiện tại
  const getConfirmationStatus = (meeting: MeetingSchedule) => {
    const participant = meeting.participants.find(p => p.id === currentEmployeeId)
    return participant ? participant.confirmed : false
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {sortedMeetings.length > 0 ? (
          sortedMeetings.map((meeting) => (
            <li key={meeting.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {meeting.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      {renderStatus(meeting.status)}
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button
                      onClick={() => onView(meeting.id)}
                      className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <EyeIcon />
                    </button>
                    
                    {meeting.status === 'scheduled' && isOrganizer(meeting) && (
                      <>
                        <button
                          onClick={() => onEdit(meeting.id)}
                          className="mr-2 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <PencilIcon />
                        </button>
                        <button
                          onClick={() => onCancel(meeting.id)}
                          className="mr-2 p-1 rounded-full text-gray-500 hover:text-red-700 focus:outline-none"
                        >
                          <XIcon />
                        </button>
                        <button
                          onClick={() => onDelete(meeting.id)}
                          className="p-1 rounded-full text-gray-500 hover:text-red-700 focus:outline-none"
                        >
                          <TrashIcon />
                        </button>
                      </>
                    )}
                    
                    {meeting.status === 'scheduled' && isParticipant(meeting) && !isOrganizer(meeting) && (
                      <div className="flex space-x-2">
                        {getConfirmationStatus(meeting) ? (
                          <button
                            onClick={() => onConfirmAttendance(meeting.id, false)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                          >
                            <XIcon />
                            <span className="ml-1">Từ chối</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onConfirmAttendance(meeting.id, true)}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                          >
                            <CheckIcon />
                            <span className="ml-1">Xác nhận</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Ngày: {meeting.date}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Thời gian: {meeting.startTime} - {meeting.endTime}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <span>{renderMeetingType(meeting.meetingType)}</span>
                    <span className="ml-2">•</span>
                    <span className="ml-2">{meeting.location}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span>Người tổ chức: {meeting.organizer.name}</span>
                  <span className="ml-2">•</span>
                  <span className="ml-2">{meeting.participants.length} người tham gia</span>
                  <span className="ml-2">•</span>
                  <span className="ml-2">{meeting.participants.filter(p => p.confirmed).length} đã xác nhận</span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-5 sm:px-6">
            <div className="text-center text-gray-500">
              Chưa có lịch họp nào. Hãy tạo lịch họp mới!
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default MeetingScheduleList
