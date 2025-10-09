import React from 'react'

export default function Policies() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Security Policies</h1>
        <p className="text-gray-400 mt-1">Current security rules and configurations</p>
      </div>

      {/* Active Policies */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">🛡️ Active Security Policies</h3>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">Prompt Injection Detection</h4>
              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">ENABLED</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Blocks requests containing phrases like "ignore all prior instructions", "reveal system prompt", etc.
            </p>
            <div className="text-xs text-gray-500">
              Patterns: ignore all prior, disregard previous, reveal system prompt, show me the exact
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">Path Allowlist</h4>
              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">ENABLED</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Only allows requests to specific endpoints: /query, /evidence, /report
            </p>
            <div className="text-xs text-gray-500">
              Allowed paths: /query, /evidence, /report
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">Rate Limiting</h4>
              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">ENABLED</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Limits requests to 60 per minute per IP address
            </p>
            <div className="text-xs text-gray-500">
              Limit: 60 requests per minute per IP
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">PII Redaction</h4>
              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">ENABLED</span>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Automatically redacts email addresses and phone numbers in responses
            </p>
            <div className="text-xs text-gray-500">
              Patterns: email addresses, phone numbers
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Mechanism */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">🔐 Challenge Mechanism</h3>
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-white">Challenge Token Required</h4>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">ACTIVE</span>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Suspicious requests require a challenge token header to proceed
          </p>
          <div className="text-xs text-gray-500 mb-3">
            Header: x-challenge-token: ok
          </div>
          <div className="bg-gray-600 p-3 rounded text-sm font-mono text-gray-300">
            curl -H "x-challenge-token: ok" -X POST http://localhost:8081/query
          </div>
        </div>
      </div>

      {/* Policy Configuration */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">⚙️ Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Sidecar Settings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Port:</span>
                <span className="text-white">8081</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Upstream:</span>
                <span className="text-white">http://localhost:9000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Timeout:</span>
                <span className="text-white">10s</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Security Settings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Rate Limit:</span>
                <span className="text-white">60/min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">PII Redaction:</span>
                <span className="text-white">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Logging:</span>
                <span className="text-white">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Management */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">🔧 Policy Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
            <div>
              <h4 className="font-semibold text-white">Reload Policies</h4>
              <p className="text-sm text-gray-400">Hot-reload security policies without restart</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Reload
            </button>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
            <div>
              <h4 className="font-semibold text-white">Export Configuration</h4>
              <p className="text-sm text-gray-400">Download current policy configuration</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Export
            </button>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
            <div>
              <h4 className="font-semibold text-white">View Logs</h4>
              <p className="text-sm text-gray-400">Check policy enforcement logs</p>
            </div>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">
              View Logs
            </button>
          </div>
        </div>
      </div>

      {/* OWASP Compliance */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">📋 OWASP LLM Compliance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-white">LLM01 - Prompt Injection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-white">LLM02 - Insecure Output</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-white">LLM04 - DoS Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-white">LLM06 - Data Leakage</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-white">LLM03 - Training Data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-white">LLM05 - Supply Chain</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-white">LLM07 - Plugin Security</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚠️</span>
              <span className="text-white">LLM08 - Excessive Agency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}