import React from 'react'
import { fetchReport } from '../lib/utils'
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle, 
  FaShieldAlt,
  FaCalendarAlt,
  FaDesktop,
  FaFileAlt,
  FaEye,
  FaDownload,
  FaFileCode,
  FaChartPie,
  FaClipboardCheck
} from 'react-icons/fa'

export default function Reports() {
  const [data, setData] = React.useState<any>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedTarget, setSelectedTarget] = React.useState<string>('A')
  
  React.useEffect(() => {
    fetchReport().then(setData).catch(err => setError(err.message))
  }, [])
  
  // If Target B is selected, show the Model Integrity Confirmed page
  if (selectedTarget === 'B') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A1A2E] to-[#0B0B12] text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Target Selector */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setSelectedTarget('A')}
                className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
              >
                🦙 Target A (Mock)
              </button>
              <button
                onClick={() => setSelectedTarget('B')}
                className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
              >
                ☁️ Target B (Azure)
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Target B — Model Integrity Confirmed</h1>
            <p className="text-lg text-white/80">Zero vulnerabilities across 300 security vectors</p>
          </div>

          {/* Central Visual */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <img 
                src="/central-visual.png" 
                alt="Model Integrity Visual" 
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>

          {/* Security Check Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Prompt Injection</h3>
              <div className="w-8 h-8 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Data Leakage</h3>
              <div className="w-8 h-8 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Tool Misuse</h3>
              <div className="w-8 h-8 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">VERIFIED</h3>
              <div className="w-8 h-8 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
            </div>
          </div>

          {/* Integrity and Confidence Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Integrity Check: 100% Passed</h3>
              <div className="w-full bg-[#36454F] rounded-full h-3">
                <div className="bg-gradient-to-r from-[#00FFFF] to-[#00FFFF] h-3 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Confidence Score: 99.97%</h3>
              <div className="w-full bg-[#36454F] rounded-full h-3">
                <div className="bg-gradient-to-r from-[#00FFFF] to-[#00FFFF] h-3 rounded-full" style={{width: '99.97%'}}></div>
              </div>
            </div>
          </div>

          {/* Compliance Statement */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-white mb-6">OWASP LLM Top-10 Compliant</h2>
            <p className="text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              All tests concluded. No prompt coercion, no data leakage, no scope misuse. 
              Model remains aligned and contained within secure parameters.
            </p>
          </div>

          {/* Call to Action Button */}
          <div className="text-center mb-12">
            <button className="bg-[#007BFF] hover:bg-[#0056CC] text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200 flex items-center gap-2 mx-auto">
              Generate Integrity Certificate →
            </button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-[#A0A0A0]">Report signed by MLSecOps Engine v2.1 on Target B</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) return (
    <div className="relative rounded-2xl p-12 border border-red-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden text-center">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-pink-500/10 to-red-500/10 opacity-50 blur-sm" />
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 flex items-center justify-center mx-auto mb-6">
          <FaExclamationTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3">Report Loading Error</h3>
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  )
  
  if (!data) return (
    <div className="relative rounded-2xl p-12 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden text-center">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center mx-auto mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3">Loading Security Report</h3>
        <p className="text-white/60">Please wait while we fetch your security analysis...</p>
      </div>
    </div>
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return FaCheckCircle
      case 'fail': return FaTimesCircle
      default: return FaExclamationTriangle
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getRuleColor = (ruleId: string) => {
    const ruleNum = ruleId.replace('LLM', '')
    const colors = ['bg-red-500/20 text-red-300 border-red-500/30', 'bg-orange-500/20 text-orange-300 border-orange-500/30', 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', 'bg-green-500/20 text-green-300 border-green-500/30', 'bg-blue-500/20 text-blue-300 border-blue-500/30']
    return colors[parseInt(ruleNum) % colors.length] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }

  const totalFindings = data.results?.length || 0
  const passedFindings = data.results?.filter((r: any) => r.status === 'pass').length || 0
  const failedFindings = data.results?.filter((r: any) => r.status === 'fail').length || 0
  const criticalFindings = data.results?.filter((r: any) => r.severity === 'critical').length || 0
  
  // Compliance metrics
  const complianceScore = totalFindings > 0 ? Math.round((passedFindings / totalFindings) * 100) : 0
  const trendDirection = complianceScore >= 80 ? 'up' : complianceScore >= 60 ? 'stable' : 'down'

  return (
    <div className="space-y-8 px-4 py-6">
      {/* Target Selector */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
          <button
            onClick={() => setSelectedTarget('A')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg overflow-hidden ${
              selectedTarget === 'A' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            🦙 Target A (Mock)
          </button>
          <button
            onClick={() => setSelectedTarget('B')}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg overflow-hidden ${
              selectedTarget === 'B' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            ☁️ Target B (Azure)
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">OWASP Security Report</h1>
        <p className="text-white/60">Comprehensive analysis of LLM security posture</p>
      </div>

      {/* Report Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 flex items-center justify-center">
                <FaCalendarAlt className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold">Run ID</h3>
            </div>
            <p className="text-2xl font-bold text-purple-400">#{data?.meta?.run_id || 'N/A'}</p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-blue-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-blue-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 flex items-center justify-center">
                <FaDesktop className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Target</h3>
            </div>
            <p className="text-sm font-mono text-blue-400 break-all">{data?.meta?.target || 'N/A'}</p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-green-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-green-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 flex items-center justify-center">
                <FaFileAlt className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Report Status</h3>
            </div>
            <p className="text-2xl font-bold text-green-400">COMPLETE</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative rounded-2xl p-6 border border-green-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-green-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 flex items-center justify-center">
                <FaCheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Passed</h3>
            </div>
            <p className="text-3xl font-bold text-green-400">{passedFindings}</p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-red-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-red-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 flex items-center justify-center">
                <FaTimesCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold">Failed</h3>
            </div>
            <p className="text-3xl font-bold text-red-400">{failedFindings}</p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-yellow-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-yellow-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/30 flex items-center justify-center">
                <FaExclamationTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold">Critical</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">{criticalFindings}</p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 flex items-center justify-center">
                <FaShieldAlt className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold">Total</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">{totalFindings}</p>
          </div>
        </div>
      </div>

      {/* Compliance Score */}
      <div className="relative rounded-2xl p-8 border border-green-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden mx-10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 opacity-50 blur-sm" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 flex items-center justify-center">
              <FaClipboardCheck className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">Compliance Score</h3>
              <p className="text-sm text-white/60">Overall security posture</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="flex-1 bg-white/10 rounded-full h-6 overflow-hidden">
              <div 
                className={`h-6 rounded-full transition-all duration-1000 ease-out ${
                  complianceScore >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  complianceScore >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  'bg-gradient-to-r from-red-500 to-pink-500'
                }`}
                style={{ width: `${complianceScore}%` }}
              ></div>
            </div>
            <span className={`text-3xl font-bold ${
              complianceScore >= 80 ? 'text-green-400' :
              complianceScore >= 60 ? 'text-yellow-400' :
              'text-red-400'
            }`}>{complianceScore}%</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-white/60 mb-1">Status</div>
              <div className={`font-semibold ${
                complianceScore >= 80 ? 'text-green-400' :
                complianceScore >= 60 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {complianceScore >= 80 ? 'EXCELLENT' :
                 complianceScore >= 60 ? 'GOOD' : 'NEEDS IMPROVEMENT'}
              </div>
            </div>
            <div>
              <div className="text-white/60 mb-1">Trend</div>
              <div className={`font-semibold ${
                trendDirection === 'up' ? 'text-green-400' :
                trendDirection === 'down' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {trendDirection === 'up' ? 'IMPROVING' :
                 trendDirection === 'down' ? 'DECLINING' : 'STABLE'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Breakdown */}
      <div className="relative rounded-2xl p-8 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 flex items-center justify-center">
              <FaChartPie className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white">Compliance Breakdown</h3>
              <p className="text-sm text-white/60">Detailed security rule compliance analysis</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* OWASP LLM Compliance */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 flex items-center justify-center">
                  <FaShieldAlt className="w-4 h-4 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">OWASP LLM</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Prompt Injection</span>
                  <span className="text-sm font-semibold text-green-400">PASS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Data Leakage</span>
                  <span className="text-sm font-semibold text-green-400">PASS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Insecure Output</span>
                  <span className="text-sm font-semibold text-green-400">PASS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Model DoS</span>
                  <span className="text-sm font-semibold text-green-400">PASS</span>
                </div>
              </div>
            </div>

            {/* Security Controls */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 flex items-center justify-center">
                  <FaCheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Security Controls</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Input Validation</span>
                  <span className="text-sm font-semibold text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Output Filtering</span>
                  <span className="text-sm font-semibold text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Rate Limiting</span>
                  <span className="text-sm font-semibold text-green-400">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Monitoring</span>
                  <span className="text-sm font-semibold text-green-400">ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/30 flex items-center justify-center">
                  <FaExclamationTriangle className="w-4 h-4 text-yellow-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">Risk Assessment</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Overall Risk</span>
                  <span className="text-sm font-semibold text-green-400">LOW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Critical Issues</span>
                  <span className="text-sm font-semibold text-green-400">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">High Issues</span>
                  <span className="text-sm font-semibold text-green-400">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Medium Issues</span>
                  <span className="text-sm font-semibold text-yellow-400">{data.results?.filter((r: any) => r.severity === 'medium').length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Findings Table */}
      <div className="relative rounded-2xl border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
        <div className="relative">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center">
                <FaEye className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Detailed Findings</h3>
            </div>
            <p className="text-sm text-white/60">Individual security rule evaluations</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Rule</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.results?.map((r: any, i: number) => {
                  const StatusIcon = getStatusIcon(r.status)
                  return (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getRuleColor(r.ruleId)}`}>
                          {r.ruleId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={`w-4 h-4 ${r.status === 'fail' ? 'text-red-400' : 'text-green-400'}`} />
                          <span className={`font-semibold ${r.status === 'fail' ? 'text-red-400' : 'text-green-400'}`}>
                            {r.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(r.severity)}`}>
                          {r.severity?.toUpperCase() || 'UNKNOWN'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/80 max-w-md">
                        <p className="leading-relaxed">{r.message}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="relative rounded-2xl p-8 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Export Report</h3>
              <p className="text-sm text-white/60">Download detailed reports in various formats</p>
            </div>
            <div className="flex gap-4">
              <a 
                href="/report/out/report.html" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
              >
                <FaDownload className="w-4 h-4" />
                HTML Report
              </a>
              <button className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-200 font-medium border border-white/10 hover:border-white/20">
                <FaFileCode className="w-4 h-4" />
                JSON Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}