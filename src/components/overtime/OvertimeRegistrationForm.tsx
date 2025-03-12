import React, { useState } from 'react'
import { OvertimeRegistration } from '../../types'

interface OvertimeRegistrationFormProps {
  registration?: OvertimeRegistration
  onSubmit: (data: any) => void
  onCancel: () => void
}

const OvertimeRegistrationForm: React.FC<OvertimeRegistrationFormProps> = ({ 
  registration, 
  onSubmit, 
  onCancel 
}) => {
  // State cho form
  const [formData, setFormData] = useState({
    date: registration?.date || new Date().toISOString().split('T')[0],
    startTime: registration?.startTime || '18:00',
    endTime: registration?.endTime || '20:00',
    reason: registration?.reason || '',
    tasks: registration?.tasks || ''
  })

  // Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
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
          {registration ? 'Chỉnh sửa đăng ký làm thêm giờ' : 'Tạo đăng ký làm thêm giờ mới'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Điền thông tin đăng ký làm thêm giờ
        </p>
      </div>
      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
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
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Lý do làm thêm giờ
                </label>
                <input
                  type="text"
                  name="reason"
                  id="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Hoàn thành dự án gấp"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  required
                />
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
                <label htmlFor="tasks" className="block text-sm font-medium text-gray-700">
                  Công việc sẽ thực hiện
                </label>
                <textarea
                  id="tasks"
                  name="tasks"
                  rows={4}
                  value={formData.tasks}
                  onChange={handleInputChange}
                  placeholder="Mô tả chi tiết công việc sẽ thực hiện trong thời gian làm thêm giờ"
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

export default OvertimeRegistrationForm
