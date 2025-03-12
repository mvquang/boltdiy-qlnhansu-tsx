import React from 'react'

const Settings: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your organization and system preferences
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium text-gray-900">Organization Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your organization information and preferences
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="company-name"
              id="company-name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue="Acme Inc."
            />
          </div>

          <div>
            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="text"
              name="company-website"
              id="company-website"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue="https://www.acmeinc.com"
            />
          </div>

          <div>
            <label htmlFor="company-size" className="block text-sm font-medium text-gray-700">
              Company Size
            </label>
            <select
              id="company-size"
              name="company-size"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue="201-500"
            >
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201-500</option>
              <option>501-1000</option>
              <option>1000+</option>
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue="America/New_York"
            >
              <option>Pacific/Honolulu (GMT-10:00)</option>
              <option>America/Los_Angeles (GMT-08:00)</option>
              <option>America/Denver (GMT-07:00)</option>
              <option>America/Chicago (GMT-06:00)</option>
              <option>America/New_York (GMT-05:00)</option>
              <option>Europe/London (GMT+00:00)</option>
              <option>Europe/Paris (GMT+01:00)</option>
              <option>Asia/Tokyo (GMT+09:00)</option>
            </select>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button
            type="button"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium text-gray-900">Email Notifications</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure which emails you want to receive
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="new-employee"
                  name="new-employee"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="new-employee" className="font-medium text-gray-700">
                  New employee notifications
                </label>
                <p className="text-gray-500">Get notified when a new employee is added to the system.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="leave-requests"
                  name="leave-requests"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="leave-requests" className="font-medium text-gray-700">
                  Leave requests
                </label>
                <p className="text-gray-500">Get notified when employees request time off.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="performance-reviews"
                  name="performance-reviews"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="performance-reviews" className="font-medium text-gray-700">
                  Performance review reminders
                </label>
                <p className="text-gray-500">Get reminders about upcoming performance reviews.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="monthly-reports"
                  name="monthly-reports"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="monthly-reports" className="font-medium text-gray-700">
                  Monthly reports
                </label>
                <p className="text-gray-500">Receive monthly HR reports and analytics.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button
            type="button"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
