import React from 'react'
import StatCard from '../components/StatCard'
import { UsersIcon, CalendarIcon, DocumentTextIcon, ChartBarIcon } from '../components/Icons'

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your organization's personnel metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Employees" 
          value={248} 
          icon={<UsersIcon />}
          change="12% from last month"
          trend="up"
        />
        <StatCard 
          title="New Hires" 
          value={18} 
          icon={<DocumentTextIcon />}
          change="5% from last month"
          trend="up"
        />
        <StatCard 
          title="Attendance Rate" 
          value="96%" 
          icon={<CalendarIcon />}
          change="2% from last month"
          trend="down"
        />
        <StatCard 
          title="Open Positions" 
          value={12} 
          icon={<ChartBarIcon />}
          change="Same as last month"
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Department Distribution</h2>
          <div className="space-y-4">
            {[
              { name: 'Engineering', count: 78, percentage: 31 },
              { name: 'Marketing', count: 42, percentage: 17 },
              { name: 'Sales', count: 56, percentage: 23 },
              { name: 'HR', count: 18, percentage: 7 },
              { name: 'Finance', count: 24, percentage: 10 },
              { name: 'Operations', count: 30, percentage: 12 },
            ].map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                  <span className="text-sm font-medium text-gray-700">{dept.count} ({dept.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${dept.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {[
                { id: 1, content: 'John Doe was hired as Senior Developer', date: '2 hours ago', type: 'hire' },
                { id: 2, content: 'Sarah Smith was promoted to Team Lead', date: '1 day ago', type: 'promotion' },
                { id: 3, content: 'Mike Johnson submitted resignation', date: '2 days ago', type: 'resignation' },
                { id: 4, content: 'Annual performance reviews started', date: '1 week ago', type: 'review' },
                { id: 5, content: 'New health benefits announced', date: '2 weeks ago', type: 'announcement' },
              ].map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== 4 ? (
                      <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div>
                        <div className="relative px-1">
                          <div className="h-8 w-8 bg-indigo-100 rounded-full ring-8 ring-white flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm text-gray-800">{activity.content}</div>
                          <p className="mt-0.5 text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
