import React, { useState } from 'react'
import { MeetingSchedule } from '../../types'

interface MeetingScheduleFormProps {
  meeting?: MeetingSchedule
  employees: { id: number; name: string }[]
  onSubmit: (data: any) => void
  onCancel: () => void
}

const MeetingScheduleForm: React.FC<MeetingScheduleFormProps> = ({ 
  meeting, 
  employees,
  onSubmit, 
  onCancel 
}) => {
  // State cho form
  const [formData, setFormData] = useState({
    title: meeting?.title || '',
    date: meeting?.date || new Date().toISOString().split('T')[0],
    startTime: meeting?.startTime || '09:00',
    endTime: meeting?.endTime || '10:00',
    location: meeting?.location || '',
    description: meeting?.description || '',
    meetingType: meeting?.meetingType || 'team',
    meetingLink: meeting?.meetingLink || '',
    participantIds: meeting?.participants.map(p => p.id) || []
  })

  // Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Xử lý thay đổi người tham gia
  const handleParticipantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => Number(option.value))
    setFormData({
      ...formData,
      participantIds: selectedOptions
    })
  }

  // Xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {meeting ? 'Chỉnh sửa lịch họp' : 'Tạo lịch họp mới'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Điền thông tin lịch họp
        </p>
      </div>
      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Tiêu đề cuộc họp
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Ngày
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700">
                  Loại cuộc họp
                </label>
                <select
                  id="meetingType"
                  name="meetingType"
                  value={formData.meetingType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="team">Họp đội</option>
                  <option value="project">Họp dự án</option>
                  <option value="client">Họp khách hàng</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Thời gian bắt đầu
                </label>
                <input
                  type="time"
                  name="startTime"
                  id="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  Thời gian kết thúc
                </label>
                <input
                  type="time"
                  name="endTime"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Địa điểm
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Phòng họp A - Tầng 3 hoặc Online"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="meetingLink" className="block text-sm font-medium text-gray-700">
                  Link cuộc họp (nếu họp online)
                </label>
                <input
                  type="text"
                  name="meetingLink"
                  id="meetingLink"
                  value={formData.meetingLink}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: https://meet.google.com/abc-defg-hij"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="participantIds" className="block text-sm font-medium text-gray-700">
                  Người tham gia
                </label>
                <select
                  id="participantIds"
                  name="participantIds"
                  multiple
                  value={formData.participantIds.map(id => id.toString())}
                  onChange={handleParticipantChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  size={5}
                  required
                >
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">Giữ Ctrl (hoặc Command trên Mac) để chọn nhiều người</p>
              </div>

              <div className="col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Mô tả cuộc họp
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Mô tả chi tiết về nội dung cuộc họp"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MeetingScheduleForm
