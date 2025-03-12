import React from 'react'
import { 
  HomeIcon, 
  UsersIcon, 
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  ClipboardIcon,
  ClockIcon,
  UsersGroupIcon
} from './Icons'

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Tổng quan', icon: <HomeIcon /> },
    { id: 'employees', name: 'Quản lý nhân viên', icon: <UsersIcon /> },
    { id: 'employee-profile', name: 'Thông tin nhân viên', icon: <UserIcon /> },
    { id: 'departments', name: 'Quản lý phòng ban', icon: <DocumentTextIcon /> },
    { id: 'weekly-reports', name: 'Báo cáo công việc', icon: <ClipboardIcon /> },
    { id: 'absence-declaration', name: 'Khai báo vắng mặt', icon: <CalendarIcon /> },
    { id: 'overtime-registration', name: 'Đăng ký làm thêm giờ', icon: <ClockIcon /> },
    { id: 'meeting-schedule', name: 'Đăng ký lịch họp', icon: <UsersGroupIcon /> },
    { id: 'settings', name: 'Cài đặt', icon: <Cog6ToothIcon /> },
  ]

  return (
    <div className="bg-indigo-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4">
        <h1 className="text-2xl font-bold">HR Dashboard</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center w-full px-4 py-3 transition-colors ${
                  currentPage === item.id
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
