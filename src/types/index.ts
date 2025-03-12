export interface Employee {
  id: number
  name: string
  position: string
  department: string
  departmentId: number
  status: 'active' | 'on-leave' | 'terminated'
  email: string
  hireDate: string
  phone?: string
  address?: string
  salary?: number
  manager?: string
  managerId?: number
  avatar?: string
}

export interface Department {
  id: number
  name: string
  description: string
  manager: string
  managerId: number
  employeeCount: number
  budget?: number
  location?: string
  createdAt: string
}

export interface EmployeeFormData {
  name: string
  position: string
  departmentId: number
  status: 'active' | 'on-leave' | 'terminated'
  email: string
  hireDate: string
  phone?: string
  address?: string
  salary?: number
  managerId?: number
}

export interface DepartmentFormData {
  name: string
  description: string
  managerId: number
  budget?: number
  location?: string
}

export interface WeeklyReport {
  id: number
  employeeId: number
  employeeName: string
  weekNumber: number
  year: number
  startDate: string
  endDate: string
  status: 'draft' | 'submitted' | 'reviewed' | 'approved' | 'rejected'
  submittedAt?: string
  reviewedAt?: string
  reviewedBy?: string
  reviewerId?: number
  comments?: string
  tasks: WeeklyReportTask[]
  nextWeekPlan?: string
  challenges?: string
  achievements?: string
}

export interface WeeklyReportTask {
  id: number
  description: string
  status: 'completed' | 'in-progress' | 'pending' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  estimatedHours: number
  actualHours: number
  comments?: string
}

export interface WeeklyReportFormData {
  weekNumber: number
  year: number
  startDate: string
  endDate: string
  tasks: WeeklyReportTaskFormData[]
  nextWeekPlan: string
  challenges: string
  achievements: string
}

export interface WeeklyReportTaskFormData {
  id?: number
  description: string
  status: 'completed' | 'in-progress' | 'pending' | 'cancelled'
  priority: 'high' | 'medium' | 'low'
  estimatedHours: number
  actualHours: number
  comments?: string
}

// Khai báo vắng mặt
export interface AbsenceDeclaration {
  id: number
  employeeId: number
  employeeName: string
  date: string
  startTime: string
  endTime: string
  reason: 'maintenance' | 'network' | 'wifi' | 'other'
  location: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approverId?: number
  approvedAt?: string
  comments?: string
}

// Đăng ký làm thêm giờ
export interface OvertimeRegistration {
  id: number
  employeeId: number
  employeeName: string
  date: string
  startTime: string
  endTime: string
  reason: string
  tasks: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approverId?: number
  approvedAt?: string
  comments?: string
  totalHours: number
}

// Đăng ký lịch họp
export interface MeetingSchedule {
  id: number
  title: string
  organizer: {
    id: number
    name: string
  }
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
  participants: {
    id: number
    name: string
    confirmed: boolean
  }[]
  status: 'scheduled' | 'cancelled' | 'completed'
  meetingType: 'team' | 'project' | 'client' | 'other'
  meetingLink?: string
}
