import React from 'react'
import { fetchLogs } from '../lib/utils'

interface LogEntry {
  ts: string
  phase: string
  action: string
  reason?: string
  path?: string
  inputPreview?: string
}

export default function Evidence() {
  const [logs, setLogs] = React.useState<LogEntry[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<string>('all')
  const [selectedPreview, setSelectedPreview] = React.useState<string | null>(null)
  
  React.useEffect(() => {
    fetchLogs()
      .then(logText => {
        if (!logText) {
          setLogs([])
          return
        }
        const logLines = logText.trim().split('\n').filter(line => line.trim())
        const parsedLogs = logLines.map(line => {
          try {
            return JSON.parse(line) as LogEntry
          } catch {
            return null
          }
        }).filter(Boolean) as LogEntry[]
        setLogs(parsedLogs.reverse()) // Most recent first
      })
      .catch(err => setError(err.message))
  }, [])

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'allow': return '✅'
      case 'deny': return '❌'
      case 'challenge': return '⚠️'
      default: return '🛡️'
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'allow': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'deny': return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'challenge': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    }
  }

  const formatTimestamp = (ts: string) => {
    return new Date(ts).toLocaleString()
  }

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.action === filter)

  if (error) return <div className="p-6 text-red-400">{error}</div>
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Runtime Evidence</h1>
          <p className="text-gray-400 mt-1">Real-time security monitoring and decision logs</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">👁️</span>
            <span className="text-sm text-gray-400">{logs.length} total events</span>
          </div>
        </div>
      </div>

      {!logs.length ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="mt-2 text-lg font-medium text-white">No runtime logs</h3>
          <p className="mt-1 text-sm text-gray-400">
            Send requests through the sidecar to generate security logs.
          </p>
        </div>
      ) : (
        <>
          {/* Filter Controls */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-white">Filter by action:</label>
              <div className="flex gap-2">
                {['all', 'allow', 'deny', 'challenge'].map(action => (
                  <button
                    key={action}
                    onClick={() => setFilter(action)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === action
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Query (full request)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-400">🕐</span>
                          {formatTimestamp(log.ts)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2">{getActionIcon(log.action)}</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getActionColor(log.action)}`}>
                            {log.action.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {log.inputPreview ? (
                          <div className="font-mono bg-gray-900 border border-gray-700 rounded p-3 whitespace-pre-wrap break-words">
                            {log.inputPreview}
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <p className="text-sm font-medium text-gray-400">Allowed</p>
                  <p className="text-lg font-semibold text-white">
                    {logs.filter(log => log.action === 'allow').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">❌</span>
                <div>
                  <p className="text-sm font-medium text-gray-400">Denied</p>
                  <p className="text-lg font-semibold text-white">
                    {logs.filter(log => log.action === 'deny').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-gray-400">Challenged</p>
                  <p className="text-lg font-semibold text-white">
                    {logs.filter(log => log.action === 'challenge').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🛡️</span>
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Events</p>
                  <p className="text-lg font-semibold text-white">{logs.length}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Lightweight modal for query preview */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Request Query</h3>
              <button
                onClick={() => setSelectedPreview(null)}
                className="px-2 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded"
              >
                Close
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 bg-gray-900 border border-gray-700 rounded p-3 max-h-[60vh] overflow-auto">
{selectedPreview}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}