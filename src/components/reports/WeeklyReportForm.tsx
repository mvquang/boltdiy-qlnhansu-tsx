import React, { useState, useEffect } from 'react'
import { WeeklyReport, WeeklyReportTaskFormData } from '../../types'
import { PlusIcon, TrashIcon } from '../Icons'

interface WeeklyReportFormProps {
  report?: WeeklyReport
  onSubmit: (data: any) => void
  onCancel: () => void
}

const WeeklyReportForm: React.FC<WeeklyReportFormProps> = ({ 
  report, 
  onSubmit, 
  onCancel 
}) => {
  // Lấy tuần hiện tại và năm
  const getCurrentWeekNumber = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const diff = now.getTime() - start.getTime()
    const oneWeek = 604800000
    return Math.ceil((diff + 3 * 86400000) / oneWeek)
  }

  // Lấy ngày đầu tuần và cuối tuần
  const getWeekDates = (year: number, weekNumber: number) => {
    const firstDayOfYear = new Date(year, 0, 1)
    const daysOffset = firstDayOfYear.getDay() === 0 ? 6 : firstDayOfYear.getDay() - 1
    
    const firstDayOfWeek = new Date(year, 0, (weekNumber - 1) * 7 + 1 - daysOffset)
    const lastDayOfWeek = new Date(firstDayOfWeek)
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)
    
    return {
      startDate: firstDayOfWeek.toISOString().split('T')[0],
      endDate: lastDayOfWeek.toISOString().split('T')[0]
    }
  }

  // State cho form
  const [formData, setFormData] = useState({
    weekNumber: report?.weekNumber || getCurrentWeekNumber(),
    year: report?.year || new Date().getFullYear(),
    startDate: report?.startDate || '',
    endDate: report?.endDate || '',
    tasks: report?.tasks.map(task => ({
      id: task.id,
      description: task.description,
      status: task.status,
      priority: task.priority,
      estimatedHours: task.estimatedHours,
      actualHours: task.actualHours,
      comments: task.comments || ''
    })) || [
      {
        description: '',
        status: 'pending' as const,
        priority: 'medium' as const,
        estimatedHours: 0,
        actualHours: 0,
        comments: ''
      }
    ],
    nextWeekPlan: report?.nextWeekPlan || '',
    challenges: report?.challenges || '',
    achievements: report?.achievements || ''
  })

  // Cập nhật ngày bắt đầu và kết thúc khi tuần hoặc năm thay đổi
  useEffect(() => {
    const { startDate, endDate } = getWeekDates(formData.year, formData.weekNumber)
    setFormData(prev => ({
      ...prev,
      startDate,
      endDate
    }))
  }, [formData.weekNumber, formData.year])

  // Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Xử lý thay đổi task
  const handleTaskChange = (index: number, field: string, value: any) => {
    const updatedTasks = [...formData.tasks]
    updatedTasks[index] = {
      ...updatedTasks[index],
      [field]: value
    }
    setFormData({
      ...formData,
      tasks: updatedTasks
    })
  }

  // Thêm task mới
  const handleAddTask = () => {
    setFormData({
      ...formData,
      tasks: [
        ...formData.tasks,
        {
          description: '',
          status: 'pending' as const,
          priority: 'medium' as const,
          estimatedHours: 0,
          actualHours: 0,
          comments: ''
        }
      ]
    })
  }

  // Xóa task
  const handleRemoveTask = (index: number) => {
    const updatedTasks = [...formData.tasks]
    updatedTasks.splice(index, 1)
    setFormData({
      ...formData,
      tasks: updatedTasks
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
          {report ? 'Chỉnh sửa báo cáo' : 'Tạo báo cáo mới'}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Điền thông tin báo cáo công việc trong tuần
        </p>
      </div>
      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="weekNumber" className="block text-sm font-medium text-gray-700">
                  Tuần
                </label>
                <input
                  type="number"
                  name="weekNumber"
                  id="weekNumber"
                  min="1"
                  max="53"
                  value={formData.weekNumber}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Năm
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  min="2000"
                  max="2100"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Ngày bắt đầu
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  Ngày kết thúc
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Danh sách công việc</h3>
                  <button
                    type="button"
                    onClick={handleAddTask}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PlusIcon />
                    <span className="ml-1">Thêm công việc</span>
                  </button>
                </div>

                {formData.tasks.map((task, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-md font-medium text-gray-900">Công việc #{index + 1}</h4>
                      {formData.tasks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTask(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label htmlFor={`task-${index}-description`} className="block text-sm font-medium text-gray-700">
                          Mô tả công việc
                        </label>
                        <input
                          type="text"
                          id={`task-${index}-description`}
                          value={task.description}
                          onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor={`task-${index}-status`} className="block text-sm font-medium text-gray-700">
                          Trạng thái
                        </label>
                        <select
                          id={`task-${index}-status`}
                          value={task.status}
                          onChange={(e) => handleTaskChange(index, 'status', e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="completed">Hoàn thành</option>
                          <option value="in-progress">Đang thực hiện</option>
                          <option value="pending">Chưa bắt đầu</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor={`task-${index}-priority`} className="block text-sm font-medium text-gray-700">
                          Mức độ ưu tiên
                        </label>
                        <select
                          id={`task-${index}-priority`}
                          value={task.priority}
                          onChange={(e) => handleTaskChange(index, 'priority', e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="high">Cao</option>
                          <option value="medium">Trung bình</option>
                          <option value="low">Thấp</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor={`task-${index}-estimatedHours`} className="block text-sm font-medium text-gray-700">
                          Thời gian dự kiến (giờ)
                        </label>
                        <input
                          type="number"
                          id={`task-${index}-estimatedHours`}
                          value={task.estimatedHours}
                          onChange={(e) => handleTaskChange(index, 'estimatedHours', Number(e.target.value))}
                          min="0"
                          step="0.5"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor={`task-${index}-actualHours`} className="block text-sm font-medium text-gray-700">
                          Thời gian thực tế (giờ)
                        </label>
                        <input
                          type="number"
                          id={`task-${index}-actualHours`}
                          value={task.actualHours}
                          onChange={(e) => handleTaskChange(index, 'actualHours', Number(e.target.value))}
                          min="0"
                          step="0.5"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor={`task-${index}-comments`} className="block text-sm font-medium text-gray-700">
                          Ghi chú
                        </label>
                        <textarea
                          id={`task-${index}-comments`}
                          value={task.comments}
                          onChange={(e) => handleTaskChange(index, 'comments', e.target.value)}
                          rows={2}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="col-span-6 mt-6">
                  <label htmlFor="nextWeekPlan" className="block text-sm font-medium text-gray-700">
                    Kế hoạch tuần tới
                  </label>
                  <textarea
                    id="nextWeekPlan"
                    name="nextWeekPlan"
                    rows={3}
                    value={formData.nextWeekPlan}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 mt-6">
                  <label htmlFor="challenges" className="block text-sm font-medium text-gray-700">
                    Khó khăn gặp phải
                  </label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    rows={3}
                    value={formData.challenges}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 mt-6">
                  <label htmlFor="achievements" className="block text-sm font-medium text-gray-700">
                    Thành tựu đạt được
                  </label>
                  <textarea
                    id="achievements"
                    name="achievements"
                    rows={3}
                    value={formData.achievements}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
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

export default WeeklyReportForm
