import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import EmployeeManagement from './pages/EmployeeManagement'
import EmployeeProfile from './pages/EmployeeProfile'
import DepartmentManagement from './pages/DepartmentManagement'
import Settings from './pages/Settings'
import WeeklyReports from './pages/WeeklyReports'
import AbsenceDeclaration from './pages/AbsenceDeclaration'
import OvertimeRegistration from './pages/OvertimeRegistration'
import MeetingSchedule from './pages/MeetingSchedule'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'employees':
        return <EmployeeManagement />
      case 'employee-profile':
        return <EmployeeProfile />
      case 'departments':
        return <DepartmentManagement />
      case 'weekly-reports':
        return <WeeklyReports />
      case 'absence-declaration':
        return <AbsenceDeclaration />
      case 'overtime-registration':
        return <OvertimeRegistration />
      case 'meeting-schedule':
        return <MeetingSchedule />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderPage()}
        </div>
      </div>
    </div>
  )
}

export default App
