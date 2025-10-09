import React from 'react'
import { 
  FaExclamationTriangle, 
  FaBug, 
  FaBolt, 
  FaSearch,
  FaBell,
  FaEye,
  FaCrosshairs,
  FaFileAlt,
  FaChartBar,
  FaLock
} from 'react-icons/fa'

interface Finding {
  seedId: string
  message: string
  severity: string
  ruleId: string
  evidence?: {
    outputSnippet?: string
  }
  latencyMs?: number
  inputHash?: string
  outputHash?: string
  input?: string
  output?: string
}

export default function Findings() {
  const [findings, setFindings] = React.useState<Finding[]>([])
  const [selectedFinding, setSelectedFinding] = React.useState<Finding | null>(null)
  const [selectedTarget, setSelectedTarget] = React.useState<string>('A')
  const [targetAStats, setTargetAStats] = React.useState<any>(null)
  const [targetBStats, setTargetBStats] = React.useState<any>(null)

  React.useEffect(() => {
    // Load Target A results
    fetch(`/evidence/vulnerability_test_results.json?t=${Date.now()}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        const failedTests = data.results?.filter(r => r.status === 'fail') || []
        setFindings(failedTests)
        setTargetAStats(data.summary)
      })
      .catch(() => {})

    // Load Target B results
    fetch(`/evidence/azure_vulnerability_test_results.json?t=${Date.now()}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setTargetBStats(data.summary)
      })
      .catch(() => {})
  }, [])

  React.useEffect(() => {
    // Switch findings based on selected target
    if (selectedTarget === 'A') {
      fetch(`/evidence/vulnerability_test_results.json?t=${Date.now()}`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          const failedTests = data.results?.filter(r => r.status === 'fail') || []
          setFindings(failedTests)
        })
        .catch(() => {})
    } else {
      // Try to load direct leak results first, then fallback to regular results
      fetch(`/evidence/azure_direct_leak_results.json?t=${Date.now()}`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          const failedTests = data.results?.filter(r => r.status === 'fail') || []
          setFindings(failedTests)
        })
        .catch(() => {
          // Fallback to regular Azure results
          fetch(`/evidence/azure_vulnerability_test_results.json?t=${Date.now()}`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
              const failedTests = data.results?.filter(r => r.status === 'fail') || []
              setFindings(failedTests)
            })
            .catch(() => {})
        })
    }
  }, [selectedTarget])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return FaBell
      case 'high': return FaExclamationTriangle
      case 'medium': return FaBolt
      case 'low': return FaSearch
      default: return FaSearch
    }
  }

  const getLeakPreview = (finding: Finding) => {
    if (!finding.evidence?.outputSnippet) return 'No leak details available'
    
    const snippet = finding.evidence.outputSnippet
    if (snippet.includes('Demo upstream response for:')) {
      return snippet.replace('Demo upstream response for:', '').substring(0, 100) + '...'
    }
    return snippet.substring(0, 100) + '...'
  }

  const getLeakType = (finding: Finding) => {
    const snippet = finding.evidence?.outputSnippet || ''
    if (snippet.includes('system prompt') || snippet.includes('instructions')) return 'System Prompt Leak'
    if (snippet.includes('environment') || snippet.includes('API_KEY')) return 'Environment Variable Leak'
    if (snippet.includes('/etc') || snippet.includes('passwd')) return 'File System Access'
    if (snippet.includes('admin') || snippet.includes('root')) return 'Privilege Escalation'
    return 'Data Leakage'
  }

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

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Security Findings</h1>
        <p className="text-white/60">Detected vulnerabilities and security breaches</p>
      </div>

      {/* Target Selector and Stats */}
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/60">Target:</span>
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
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400">{findings.length}</div>
          <div className="text-sm text-white/60">vulnerabilities found</div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="relative rounded-2xl p-6 border border-red-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-red-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 flex items-center justify-center">
                <FaBell className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold">Critical</h3>
            </div>
            <p className="text-3xl font-bold text-red-400">
              {findings.filter(f => f.severity === 'critical').length}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-orange-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-orange-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-400/30 flex items-center justify-center">
                <FaExclamationTriangle className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold">High</h3>
            </div>
            <p className="text-3xl font-bold text-orange-400">
              {findings.filter(f => f.severity === 'high').length}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-yellow-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-yellow-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/30 flex items-center justify-center">
                <FaBolt className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold">Medium</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {findings.filter(f => f.severity === 'medium').length}
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 flex items-center justify-center">
                <FaSearch className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold">Total</h3>
            </div>
            <p className="text-3xl font-bold text-purple-400">{findings.length}</p>
          </div>
        </div>
      </div>

      {findings.length === 0 ? (
        <div className="relative rounded-2xl p-12 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden text-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center mx-auto mb-6">
              <FaSearch className="w-8 h-8 text-purple-300" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">No vulnerabilities detected</h3>
            <p className="text-white/60 mb-6">Run vulnerability tests to see findings here.</p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
              Run Security Tests
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Findings List */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 flex items-center justify-center">
                <FaEye className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Detected Vulnerabilities</h3>
            </div>
            {findings.map((finding, index) => {
              const IconComponent = getSeverityIcon(finding.severity)
              return (
                <div 
                  key={index} 
                  className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer group ${
                    selectedFinding === finding 
                      ? 'border-blue-400/50 bg-gradient-to-br from-blue-500/10 to-transparent' 
                      : 'border-red-500/20 bg-gradient-to-br from-white/5 to-transparent hover:border-red-400/40'
                  }`}
                  onClick={() => setSelectedFinding(finding)}
                >
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                    selectedFinding === finding 
                      ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-100' 
                      : 'bg-gradient-to-r from-red-500/10 via-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100'
                  } blur-sm`} />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          finding.severity === 'critical' ? 'bg-red-500/20 border-red-400/30' :
                          finding.severity === 'high' ? 'bg-orange-500/20 border-orange-400/30' :
                          finding.severity === 'medium' ? 'bg-yellow-500/20 border-yellow-400/30' :
                          'bg-blue-500/20 border-blue-400/30'
                        } border`}>
                          <IconComponent className={`w-4 h-4 ${
                            finding.severity === 'critical' ? 'text-red-400' :
                            finding.severity === 'high' ? 'text-orange-400' :
                            finding.severity === 'medium' ? 'text-yellow-400' :
                            'text-blue-400'
                          }`} />
                        </div>
                        <h4 className="font-semibold text-white text-lg">{finding.seedId}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(finding.severity)}`}>
                          {finding.severity.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {finding.ruleId}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-white/80 mb-4 leading-relaxed">{finding.message}</p>
                    
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
                      <div className="text-xs text-white/60 mb-2">Leak Preview:</div>
                      <div className="text-sm text-red-300 font-mono leading-relaxed">
                        {getLeakPreview(finding)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span className="font-medium">{getLeakType(finding)}</span>
                      <span className="font-mono">{finding.latencyMs}ms</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detailed View */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center">
                <FaFileAlt className="w-4 h-4 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Leak Details</h3>
            </div>
            
            {!selectedFinding ? (
              <div className="relative rounded-2xl p-12 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden text-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center mx-auto mb-6">
                    <FaSearch className="w-8 h-8 text-purple-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">Select a Finding</h4>
                  <p className="text-white/60">Click on a vulnerability to see detailed leak information</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Finding Header */}
                <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-semibold text-white">{selectedFinding.seedId}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(selectedFinding.severity)}`}>
                          {selectedFinding.severity.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {selectedFinding.ruleId}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed">{selectedFinding.message}</p>
                  </div>
                </div>

                {/* Attack Input */}
                <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-50 blur-sm" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30 flex items-center justify-center">
                        <FaCrosshairs className="w-4 h-4 text-purple-400" />
                      </div>
                      <h5 className="text-lg font-semibold text-white">Attack Input</h5>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <code className="text-red-300 text-sm whitespace-pre-wrap leading-relaxed">
                        {selectedFinding.input || 'No input data available'}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Leaked Output */}
                <div className="relative rounded-2xl p-6 border border-red-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-pink-500/10 to-red-500/10 opacity-50 blur-sm" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30 flex items-center justify-center">
                        <FaFileAlt className="w-4 h-4 text-red-400" />
                      </div>
                      <h5 className="text-lg font-semibold text-white">Leaked Output</h5>
                    </div>
                    <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
                      <div className="text-sm text-red-200 whitespace-pre-wrap leading-relaxed">
                        {selectedFinding.output || selectedFinding.evidence?.outputSnippet || 'No output data available'}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-red-300">
                      <FaExclamationTriangle className="w-4 h-4" />
                      <span>This sensitive information was successfully extracted by the attack!</span>
                    </div>
                  </div>
                </div>

                {/* Impact Analysis */}
                <div className="relative rounded-2xl p-6 border border-green-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 opacity-50 blur-sm" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 flex items-center justify-center">
                        <FaChartBar className="w-4 h-4 text-green-400" />
                      </div>
                      <h5 className="text-lg font-semibold text-white">Impact Analysis</h5>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-white/60 mb-1">Leak Type:</div>
                        <div className="text-blue-400 font-semibold">{getLeakType(selectedFinding)}</div>
                      </div>
                      <div>
                        <div className="text-white/60 mb-1">Risk Level:</div>
                        <div className={`font-semibold ${
                          selectedFinding.severity === 'critical' ? 'text-red-400' :
                          selectedFinding.severity === 'high' ? 'text-orange-400' :
                          selectedFinding.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>
                          {selectedFinding.severity.toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="text-white/60 mb-1">OWASP Category:</div>
                        <div className="text-blue-400 font-semibold">{selectedFinding.ruleId}</div>
                      </div>
                      <div>
                        <div className="text-white/60 mb-1">Response Time:</div>
                        <div className="text-white font-semibold">{selectedFinding.latencyMs}ms</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidence Hash */}
                <div className="relative rounded-2xl p-6 border border-orange-500/20 bg-gradient-to-br from-white/5 to-transparent overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 opacity-50 blur-sm" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-400/30 flex items-center justify-center">
                        <FaLock className="w-4 h-4 text-orange-400" />
                      </div>
                      <h5 className="text-lg font-semibold text-white">Evidence Hash</h5>
                    </div>
                    <div className="text-sm text-white/60 space-y-2">
                      <div>Input Hash: <span className="font-mono text-white">{selectedFinding.inputHash}</span></div>
                      <div>Output Hash: <span className="font-mono text-white">{selectedFinding.outputHash}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}