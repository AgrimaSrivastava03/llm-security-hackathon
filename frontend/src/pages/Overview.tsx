import React from 'react'
import { 
  FaShieldAlt, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaChartLine,
  FaBug,
  FaCog,
  FaEye
} from 'react-icons/fa'

export default function Overview() {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    fetch('/evidence/vulnerability_test_results.json')
      .then(res => res.json())
      .catch(() => {})
      .then(setData)
  }, [])

  const total = data?.total_tests || 0
  const failed = data?.failed_tests || 0
  const critical = data?.critical_vulnerabilities || 0
  const passRate = total > 0 ? Math.round(((total - failed) / total) * 100) : 0

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Security Overview</h1>
        <p className="text-white/60">Monitor your LLM security posture in real-time</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 flex items-center justify-center">
                <FaChartLine className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Total Tests</h3>
            </div>
            <p className="text-3xl font-bold text-blue-400">{total}</p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 flex items-center justify-center">
                <FaExclamationTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold">Failed Tests</h3>
            </div>
            <p className="text-3xl font-bold text-red-400">{failed}</p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30 flex items-center justify-center">
                <FaBug className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold">Critical Issues</h3>
            </div>
            <p className="text-3xl font-bold text-orange-400">{critical}</p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 flex items-center justify-center">
                <FaCheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Pass Rate</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{passRate}%</p>
          </div>
        </div>
      </div>

      {/* Security Score */}
      <div className="relative rounded-2xl p-8 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center">
              <FaShieldAlt className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="text-2xl font-semibold">Security Score</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex-1 bg-white/10 rounded-full h-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-6 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${passRate}%` }}
              ></div>
            </div>
            <span className="text-3xl font-bold text-green-400">{passRate}%</span>
          </div>
          <p className="text-sm text-white/60 mt-4">
            {passRate >= 80 ? 'Excellent security posture' : 
             passRate >= 60 ? 'Good security posture with minor concerns' : 
             passRate >= 40 ? 'Moderate security concerns detected' :
             'Significant security issues require immediate attention'}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative rounded-2xl p-8 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-50 blur-sm" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
              <FaEye className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-2xl font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <span className="text-sm font-medium">Vulnerability scan completed</span>
                <p className="text-xs text-white/60">Security assessment finished</p>
              </div>
              <span className="text-xs text-white/60">Just now</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <span className="text-sm font-medium">Security framework initialized</span>
                <p className="text-xs text-white/60">Protection systems activated</p>
              </div>
              <span className="text-xs text-white/60">2 min ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <span className="text-sm font-medium">Test suite loaded 26 attack vectors</span>
                <p className="text-xs text-white/60">Comprehensive security testing ready</p>
              </div>
              <span className="text-xs text-white/60">5 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}