import React, { useState, useEffect } from 'react'
import { MeetingSchedule as MeetingScheduleType } from '../types'
import MeetingScheduleList from '../components/meeting/MeetingScheduleList'
import MeetingScheduleForm from '../components/meeting/MeetingScheduleForm'
import MeetingScheduleDetail from '../components/meeting/MeetingScheduleDetail'

const MeetingSchedule: React.FC = () => {
  const [view, setView] = useState<'list' | 'create' | 'detail' | 'edit'>('list')
  const [meetings, setMeetings] = useState<MeetingScheduleType[]>([])
  const [currentMeeting, setCurrentMeeting] = useState<MeetingScheduleType | null>(null)
  const [currentEmployeeId] = useState<number>(1) // Giả định ID nhân viên đang đăng nhập

  // Mock data cho nhân viên
  const employees = [
    { id: 1, name: 'Nguyễn Văn A' },
    { id: 2, name: 'Trần Thị B' },
    { id: 3, name: 'Lê Văn C' },
    { id: 4, name: 'Phạm Thị D' },
    { id: 5, name: 'Trần Văn B' },
    { id: 6, name: 'Hoàng Văn E' },
    { id: 7, name: 'Ngô Thị F' },
    { id: 8, name: 'Vũ Văn G' }
  ]

  // Mock data cho lịch họp
  useEffect(() => {
    const mockMeetings: MeetingScheduleType[] = [
      {
        id: 1,
        title: 'Họp đội phát triển sản phẩm',
        organizer: {
          id: 1,
          name: 'Nguyễn Văn A'
        },
        date: '2023-09-15',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Phòng họp A - Tầng 3',
        description: 'Thảo luận về tính năng mới của sản phẩm\nPhân công công việc\nCập nhật tiến độ dự án',
        participants: [
          { id: 1, name: 'Nguyễn Văn A', confirmed: true },
          { id: 2, name: 'Trần Thị B', confirmed: true },
          { id: 3, name: 'Lê Văn C', confirmed: false },
          { id: 4, name: 'Phạm Thị D', confirmed: true }
        ],
        status: 'scheduled',
        meetingType: 'team'
      },
      {
        id: 2,
        title: 'Họp với khách hàng ABC',
        organizer: {
          id: 5,
          name: 'Trần Văn B'
        },
        date: '2023-09-18',
        startTime: '14:00',
        endTime: '15:30',
        location: 'Online',
        description: 'Demo sản phẩm mới\nThảo luận về yêu cầu bổ sung\nLấy phản hồi từ khách hàng',
        participants: [
          { id: 1, name: 'Nguyễn Văn A', confirmed: true },
          { id: 5, name: 'Trần Văn B', confirmed: true },
          { id: 6, name: 'Hoàng Văn E', confirmed: false }
        ],
        status: 'scheduled',
        meetingType: 'client',
        meetingLink: 'https://meet.google.com/abc-defg-hij'
      },
      {
        id: 3,
        title: 'Họp review sprint',
        organizer: {
          id: 1,
          name: 'Nguyễn Văn A'
        },
        date: '2023-09-10',
        startTime: '10:00',
        endTime: '11:00',
        location: 'Phòng họp B - Tầng 2',
        description: 'Review công việc đã hoàn thành\nThảo luận về vấn đề gặp phải\nLên kế hoạch cho sprint tiếp theo',
        participants: [
          { id: 1, name: 'Nguyễn Văn A', confirmed: true },
          { id: 2, name: 'Trần Thị B', confirmed: true },
          { id: 3, name: 'Lê Văn C', confirmed: true },
          { id: 4, name: 'Phạm Thị D', confirmed: true },
          { id: 7, name: 'Ngô Thị F', confirmed: true }
        ],
        status: 'completed',
        meetingType: 'project'
      }
    ]

    setMeetings(mockMeetings)
  }, [])

  // Xử lý tạo lịch họp mới
  const handleCreateMeeting = (meetingData: any) => {
    const participants = meetingData.participantIds.map((id: number) => {
      const employee = employees.find(e => e.id === id)
      return {
        id,
        name: employee?.name || '',
        confirmed: id === currentEmployeeId // Người tạo tự động xác nhận
      }
    })
    
    const newMeeting: MeetingScheduleType = {
      id: meetings.length + 1,
      title: meetingData.title,
      organizer: {
        id: currentEmployeeId,
        name: 'Nguyễn Văn A' // Giả định tên nhân viên đang đăng nhập
      },
      date: meetingData.date,
      startTime: meetingData.startTime,
      endTime: meetingData.endTime,
      location: meetingData.location,
      description: meetingData.description,
      participants,
      status: 'scheduled',
      meetingType: meetingData.meetingType,
      meetingLink: meetingData.meetingLink
    }

    setMeetings([...meetings, newMeeting])
    setCurrentMeeting(newMeeting)
    setView('detail')
  }

  // Xử lý cập nhật lịch họp
  const handleUpdateMeeting = (meetingData: any) => {
    if (!currentMeeting) return

    // Giữ lại những người tham gia hiện tại không có trong danh sách mới
    const existingParticipants = currentMeeting.participants.filter(
      p => !meetingData.participantIds.includes(p.id)
    )
    
    // Thêm người tham gia mới
    const newParticipants = meetingData.participantIds
      .filter((id: number) => !currentMeeting.participants.some(p => p.id === id))
      .map((id: number) => {
        const employee = employees.find(e => e.id === id)
        return {
          id,
          name: employee?.name || '',
          confirmed: id === currentEmployeeId // Người tạo tự động xác nhận
        }
      })
    
    // Giữ lại những người tham gia hiện tại có trong danh sách mới
    const keptParticipants = currentMeeting.participants.filter(
      p => meetingData.participantIds.includes(p.id)
    )
    
    const updatedMeeting: MeetingScheduleType = {
      ...currentMeeting,
      title: meetingData.title,
      date: meetingData.date,
      startTime: meetingData.startTime,
      endTime: meetingData.endTime,
      location: meetingData.location,
      description: meetingData.description,
      participants: [...keptParticipants, ...newParticipants],
      meetingType: meetingData.meetingType,
      meetingLink: meetingData.meetingLink
    }

    setMeetings(meetings.map(meeting => 
      meeting.id === currentMeeting.id ? updatedMeeting : meeting
    ))
    setCurrentMeeting(updatedMeeting)
    setView('detail')
  }

  // Xử lý xóa lịch họp
  const handleDeleteMeeting = (meetingId: number) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId))
    setView('list')
  }

  // Xử lý hủy lịch họp
  const handleCancelMeeting = (meetingId: number) => {
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === meetingId) {
        return { ...meeting, status: 'cancelled' }
      }
      return meeting
    })
    
    setMeetings(updatedMeetings)
    
    const updatedMeeting = updatedMeetings.find(m => m.id === meetingId)
    if (updatedMeeting) {
      setCurrentMeeting(updatedMeeting)
    }
    
    if (view === 'list') {
      // Nếu đang ở view list, giữ nguyên view
    } else {
      // Nếu đang xem chi tiết, cập nhật view detail với trạng thái mới
      setView('detail')
    }
  }

  // Xử lý xác nhận tham gia
  const handleConfirmAttendance = (meetingId: number, confirm: boolean) => {
    const updatedMeetings = meetings.map(meeting => {
      if (meeting.id === meetingId) {
        const updatedParticipants = meeting.participants.map(participant => {
          if (participant.id === currentEmployeeId) {
            return { ...participant, confirmed: confirm }
          }
          return participant
        })
        return { ...meeting, participants: updatedParticipants }
      }
      return meeting
    })
    
    setMeetings(updatedMeetings)
    
    const updatedMeeting = updatedMeetings.find(m => m.id === meetingId)
    if (updatedMeeting) {
      setCurrentMeeting(updatedMeeting)
    }
  }

  // Xử lý xem chi tiết lịch họp
  const handleViewMeeting = (meetingId: number) => {
    const meeting = meetings.find(m => m.id === meetingId)
    if (meeting) {
      setCurrentMeeting(meeting)
      setView('detail')
    }
  }

  // Xử lý chỉnh sửa lịch họp
  const handleEditMeeting = (meetingId: number) => {
    const meeting = meetings.find(m => m.id === meetingId)
    if (meeting) {
      setCurrentMeeting(meeting)
      setView('edit')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Đăng ký lịch họp
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Tạo và quản lý lịch họp, mời người tham gia
          </p>
        </div>
        {view === 'list' && (
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => {
                setCurrentMeeting(null)
                setView('create')
              }}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tạo lịch họp mới
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
        <MeetingScheduleList 
          meetings={meetings} 
          onView={handleViewMeeting}
          onEdit={handleEditMeeting}
          onDelete={handleDeleteMeeting}
          onCancel={handleCancelMeeting}
          onConfirmAttendance={handleConfirmAttendance}
          currentEmployeeId={currentEmployeeId}
        />
      )}

      {view === 'create' && (
        <MeetingScheduleForm 
          employees={employees}
          onSubmit={handleCreateMeeting}
          onCancel={() => setView('list')}
        />
      )}

      {view === 'edit' && currentMeeting && (
        <MeetingScheduleForm 
          meeting={currentMeeting}
          employees={employees}
          onSubmit={handleUpdateMeeting}
          onCancel={() => setView('detail')}
        />
      )}

      {view === 'detail' && currentMeeting && (
        <MeetingScheduleDetail 
          meeting={currentMeeting}
          onEdit={() => setView('edit')}
          onDelete={handleDeleteMeeting}
          onCancel={handleCancelMeeting}
          onConfirmAttendance={handleConfirmAttendance}
          currentEmployeeId={currentEmployeeId}
        />
      )}
    </div>
  )
}

export default MeetingSchedule
