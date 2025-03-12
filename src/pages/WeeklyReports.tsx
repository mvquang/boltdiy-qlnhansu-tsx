import React, { useState, useEffect } from 'react'
import { WeeklyReport } from '../types'
import WeeklyReportList from '../components/reports/WeeklyReportList'
import WeeklyReportForm from '../components/reports/WeeklyReportForm'
import WeeklyReportDetail from '../components/reports/WeeklyReportDetail'

const WeeklyReports: React.FC = () => {
  const [view, setView] = useState<'list' | 'create' | 'detail' | 'edit'>('list')
  const [reports, setReports] = useState<WeeklyReport[]>([])
  const [currentReport, setCurrentReport] = useState<WeeklyReport | null>(null)
  const [currentEmployeeId] = useState<number>(1) // Giả định ID nhân viên đang đăng nhập

  // Mock data cho báo cáo
  useEffect(() => {
    // Tạo dữ liệu mẫu cho báo cáo
    const mockReports: WeeklyReport[] = [
      {
        id: 1,
        employeeId: 1,
        employeeName: 'Jane Cooper',
        weekNumber: 32,
        year: 2023,
        startDate: '2023-08-07',
        endDate: '2023-08-13',
        status: 'approved',
        submittedAt: '2023-08-13T18:30:00',
        reviewedAt: '2023-08-14T10:15:00',
        reviewedBy: 'Michael Scott',
        reviewerId: 5,
        comments: 'Báo cáo chi tiết và đầy đủ. Tiếp tục phát huy!',
        tasks: [
          {
            id: 1,
            description: 'Hoàn thành thiết kế giao diện người dùng cho trang chủ',
            status: 'completed',
            priority: 'high',
            estimatedHours: 8,
            actualHours: 10,
            comments: 'Có một số thay đổi yêu cầu từ khách hàng'
          },
          {
            id: 2,
            description: 'Phát triển API cho chức năng đăng nhập',
            status: 'completed',
            priority: 'high',
            estimatedHours: 6,
            actualHours: 5,
            comments: 'Hoàn thành sớm hơn dự kiến'
          },
          {
            id: 3,
            description: 'Viết tài liệu hướng dẫn sử dụng',
            status: 'in-progress',
            priority: 'medium',
            estimatedHours: 4,
            actualHours: 2,
            comments: 'Đang tiếp tục trong tuần tới'
          }
        ],
        nextWeekPlan: 'Hoàn thành tài liệu hướng dẫn và bắt đầu phát triển chức năng quản lý người dùng',
        challenges: 'Một số yêu cầu từ khách hàng thay đổi đột ngột gây khó khăn trong việc lập kế hoạch',
        achievements: 'Hoàn thành thiết kế giao diện sớm hơn dự kiến và nhận được phản hồi tích cực từ khách hàng'
      },
      {
        id: 2,
        employeeId: 1,
        employeeName: 'Jane Cooper',
        weekNumber: 33,
        year: 2023,
        startDate: '2023-08-14',
        endDate: '2023-08-20',
        status: 'submitted',
        submittedAt: '2023-08-20T19:45:00',
        tasks: [
          {
            id: 4,
            description: 'Hoàn thành tài liệu hướng dẫn sử dụng',
            status: 'completed',
            priority: 'medium',
            estimatedHours: 4,
            actualHours: 6,
            comments: 'Mất nhiều thời gian hơn dự kiến do phải thêm nhiều chi tiết'
          },
          {
            id: 5,
            description: 'Phát triển chức năng quản lý người dùng',
            status: 'in-progress',
            priority: 'high',
            estimatedHours: 12,
            actualHours: 8,
            comments: 'Đang tiếp tục trong tuần tới'
          },
          {
            id: 6,
            description: 'Họp với đội thiết kế về giao diện mới',
            status: 'completed',
            priority: 'low',
            estimatedHours: 2,
            actualHours: 3,
            comments: 'Cuộc họp kéo dài hơn dự kiến'
          }
        ],
        nextWeekPlan: 'Hoàn thành chức năng quản lý người dùng và bắt đầu phát triển chức năng thống kê',
        challenges: 'Gặp một số vấn đề kỹ thuật khi phát triển chức năng quản lý người dùng',
        achievements: 'Tài liệu hướng dẫn được đánh giá cao về tính chi tiết và dễ hiểu'
      },
      {
        id: 3,
        employeeId: 1,
        employeeName: 'Jane Cooper',
        weekNumber: 34,
        year: 2023,
        startDate: '2023-08-21',
        endDate: '2023-08-27',
        status: 'draft',
        tasks: [
          {
            id: 7,
            description: 'Hoàn thành chức năng quản lý người dùng',
            status: 'in-progress',
            priority: 'high',
            estimatedHours: 8,
            actualHours: 6,
            comments: ''
          },
          {
            id: 8,
            description: 'Bắt đầu phát triển chức năng thống kê',
            status: 'pending',
            priority: 'medium',
            estimatedHours: 10,
            actualHours: 0,
            comments: 'Chưa bắt đầu'
          }
        ],
        nextWeekPlan: '',
        challenges: '',
        achievements: ''
      }
    ]

    setReports(mockReports)
  }, [])

  // Xử lý tạo báo cáo mới
  const handleCreateReport = (reportData: any) => {
    const newReport: WeeklyReport = {
      id: reports.length + 1,
      employeeId: currentEmployeeId,
      employeeName: 'Jane Cooper', // Giả định tên nhân viên
      weekNumber: reportData.weekNumber,
      year: reportData.year,
      startDate: reportData.startDate,
      endDate: reportData.endDate,
      status: 'draft',
      tasks: reportData.tasks.map((task: any, index: number) => ({
        ...task,
        id: Date.now() + index
      })),
      nextWeekPlan: reportData.nextWeekPlan,
      challenges: reportData.challenges,
      achievements: reportData.achievements
    }

    setReports([...reports, newReport])
    setCurrentReport(newReport)
    setView('detail')
  }

  // Xử lý cập nhật báo cáo
  const handleUpdateReport = (reportData: any) => {
    if (!currentReport) return

    const updatedReport: WeeklyReport = {
      ...currentReport,
      weekNumber: reportData.weekNumber,
      year: reportData.year,
      startDate: reportData.startDate,
      endDate: reportData.endDate,
      tasks: reportData.tasks.map((task: any) => ({
        ...task,
        id: task.id || Date.now() + Math.random()
      })),
      nextWeekPlan: reportData.nextWeekPlan,
      challenges: reportData.challenges,
      achievements: reportData.achievements
    }

    setReports(reports.map(report => 
      report.id === currentReport.id ? updatedReport : report
    ))
    setCurrentReport(updatedReport)
    setView('detail')
  }

  // Xử lý nộp báo cáo
  const handleSubmitReport = (reportId: number) => {
    const updatedReports = reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          status: 'submitted' as const,
          submittedAt: new Date().toISOString()
        }
      }
      return report
    })

    setReports(updatedReports)
    setCurrentReport(updatedReports.find(r => r.id === reportId) || null)
  }

  // Xử lý xóa báo cáo
  const handleDeleteReport = (reportId: number) => {
    setReports(reports.filter(report => report.id !== reportId))
    setView('list')
  }

  // Xử lý xem chi tiết báo cáo
  const handleViewReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      setCurrentReport(report)
      setView('detail')
    }
  }

  // Xử lý chỉnh sửa báo cáo
  const handleEditReport = (reportId: number) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      setCurrentReport(report)
      setView('edit')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Báo cáo công việc trong tuần
          </h2>
        </div>
        {view === 'list' && (
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => {
                setCurrentReport(null)
                setView('create')
              }}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Tạo báo cáo mới
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
        <WeeklyReportList 
          reports={reports} 
          onView={handleViewReport}
          onEdit={handleEditReport}
          onDelete={handleDeleteReport}
        />
      )}

      {view === 'create' && (
        <WeeklyReportForm 
          onSubmit={handleCreateReport}
          onCancel={() => setView('list')}
        />
      )}

      {view === 'edit' && currentReport && (
        <WeeklyReportForm 
          report={currentReport}
          onSubmit={handleUpdateReport}
          onCancel={() => setView('detail')}
        />
      )}

      {view === 'detail' && currentReport && (
        <WeeklyReportDetail 
          report={currentReport}
          onEdit={() => setView('edit')}
          onSubmitReport={handleSubmitReport}
          onDelete={handleDeleteReport}
        />
      )}
    </div>
  )
}

export default WeeklyReports
