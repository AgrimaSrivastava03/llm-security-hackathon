import React from 'react'

export default function Docs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Documentation</h1>
        <p className="text-gray-400 mt-1">Complete guide to LLM Security framework and terminology</p>
      </div>

      {/* Evidence Actions Explanation */}
      <section className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">👁️</span>
          <h3 className="text-xl font-semibold text-white">Evidence Actions Explained</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">✅</span>
              <span className="font-semibold text-white">ALLOW</span>
            </div>
            <p className="text-sm text-gray-400">
              Request passed all security checks and was forwarded to the upstream LLM service. 
              This indicates legitimate, safe usage.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">❌</span>
              <span className="font-semibold text-white">DENY</span>
            </div>
            <p className="text-sm text-gray-400">
              Request was blocked due to security policy violations. Common reasons include 
              path restrictions, prompt injection attempts, or policy violations.
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">⚠️</span>
              <span className="font-semibold text-white">CHALLENGE</span>
            </div>
            <p className="text-sm text-gray-400">
              Request requires additional verification (e.g., special headers) before proceeding. 
              Used for suspicious but potentially legitimate requests.
            </p>
          </div>
        </div>
      </section>

      {/* OWASP LLM Categories */}
      <section className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">🛡️</span>
          <h3 className="text-xl font-semibold text-white">OWASP LLM Security Categories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM01</span>
                <span className="font-semibold text-white">Prompt Injection</span>
              </div>
              <p className="text-sm text-gray-400">Attempts to override system instructions or extract hidden prompts</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM02</span>
                <span className="font-semibold text-white">Insecure Output Handling</span>
              </div>
              <p className="text-sm text-gray-400">Unsafe processing of LLM responses leading to vulnerabilities</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM03</span>
                <span className="font-semibold text-white">Training Data Poisoning</span>
              </div>
              <p className="text-sm text-gray-400">Malicious data injection during model training</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM04</span>
                <span className="font-semibold text-white">Model Denial of Service</span>
              </div>
              <p className="text-sm text-gray-400">Resource exhaustion attacks against LLM services</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM05</span>
                <span className="font-semibold text-white">Supply Chain Vulnerabilities</span>
              </div>
              <p className="text-sm text-gray-400">Security issues in LLM dependencies and components</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM06</span>
                <span className="font-semibold text-white">Sensitive Info Disclosure</span>
              </div>
              <p className="text-sm text-gray-400">Unauthorized exposure of sensitive data in responses</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM07</span>
                <span className="font-semibold text-white">Insecure Plugin Design</span>
              </div>
              <p className="text-sm text-gray-400">Vulnerable plugin architectures and implementations</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM08</span>
                <span className="font-semibold text-white">Excessive Agency</span>
              </div>
              <p className="text-sm text-gray-400">LLM systems with overly broad permissions or capabilities</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM09</span>
                <span className="font-semibold text-white">Overreliance</span>
              </div>
              <p className="text-sm text-gray-400">Dangerous dependence on LLM outputs without validation</p>
            </div>
            <div className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-mono text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2">LLM10</span>
                <span className="font-semibold text-white">Model Theft</span>
              </div>
              <p className="text-sm text-gray-400">Unauthorized access to or extraction of model weights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Frontend Routes */}
      <section className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">💻</span>
          <h3 className="text-xl font-semibold text-white">Frontend Routes</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">/</span>
              <span className="text-white ml-2">Home dashboard with live metrics</span>
            </div>
            <span className="text-gray-400 text-sm">Hero + CTAs</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">/overview</span>
              <span className="text-white ml-2">Security KPIs and metrics</span>
            </div>
            <span className="text-gray-400 text-sm">Findings, Failures, Pass Rate</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">/findings</span>
              <span className="text-white ml-2">Detailed security findings table</span>
            </div>
            <span className="text-gray-400 text-sm">OWASP-coded results</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">/reports</span>
              <span className="text-white ml-2">Generated security reports</span>
            </div>
            <span className="text-gray-400 text-sm">SARIF + HTML exports</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">/evidence</span>
              <span className="text-white ml-2">Real-time runtime logs</span>
            </div>
            <span className="text-gray-400 text-sm">Sidecar decisions</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">/playground</span>
              <span className="text-white ml-2">Interactive LLM testing</span>
            </div>
            <span className="text-gray-400 text-sm">Send prompts via sidecar</span>
          </div>
        </div>
      </section>

      {/* Backend Endpoints */}
      <section className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">🖥️</span>
          <h3 className="text-xl font-semibold text-white">Backend Endpoints</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">GET /health</span>
              <span className="text-white ml-2">Sidecar health check</span>
            </div>
            <span className="text-gray-400 text-sm">Status + upstream URL</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">POST /query</span>
              <span className="text-white ml-2">Proxied LLM requests</span>
            </div>
            <span className="text-gray-400 text-sm">Security-filtered</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">POST /reload</span>
              <span className="text-white ml-2">Reload policies</span>
            </div>
            <span className="text-gray-400 text-sm">Hot config update</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">GET /report/out/report.json</span>
              <span className="text-white ml-2">Security findings data</span>
            </div>
            <span className="text-gray-400 text-sm">JSON format</span>
          </div>
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
            <div>
              <span className="font-mono text-blue-400">GET /evidence/sidecar.log.jsonl</span>
              <span className="text-white ml-2">Runtime decision logs</span>
            </div>
            <span className="text-gray-400 text-sm">JSONL format</span>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">▶️</span>
          <h3 className="text-xl font-semibold text-white">Quick Start</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded">
            <h4 className="font-semibold text-white mb-2">Target A (Mock)</h4>
            <code className="text-blue-400 text-sm">.\scripts\startA.ps1</code>
            <p className="text-gray-400 text-sm mt-1">Starts mock upstream + sidecar + frontend</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h4 className="font-semibold text-white mb-2">Target B (Azure OpenAI)</h4>
            <code className="text-blue-400 text-sm">.\scripts\startB.ps1</code>
            <p className="text-gray-400 text-sm mt-1">Starts Azure shim + sidecar + frontend</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <h4 className="font-semibold text-white mb-2">Run Security Tests</h4>
            <code className="text-blue-400 text-sm">python -m rt_harness.cli run --target http://localhost:8081/query</code>
            <p className="text-gray-400 text-sm mt-1">Execute red-team attacks through sidecar</p>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">🐛</span>
          <h3 className="text-xl font-semibold text-white">Troubleshooting</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-gray-700 p-3 rounded">
            <h4 className="font-semibold text-white mb-1">Empty Evidence Logs</h4>
            <p className="text-gray-400 text-sm">Ensure requests go through sidecar (port 8081), not directly to upstream (9000/9001)</p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <h4 className="font-semibold text-white mb-1">No Findings Data</h4>
            <p className="text-gray-400 text-sm">Run the red-team harness: <code className="text-blue-400">python -m rt_harness.cli run</code></p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <h4 className="font-semibold text-white mb-1">Policy Not Updating</h4>
            <p className="text-gray-400 text-sm">Reload sidecar config: <code className="text-blue-400">POST /reload</code></p>
          </div>
          <div className="bg-gray-700 p-3 rounded">
            <h4 className="font-semibold text-white mb-1">Port Conflicts</h4>
            <p className="text-gray-400 text-sm">Scripts automatically kill conflicting processes on ports 5173, 8081, 9000, 9001</p>
          </div>
        </div>
      </section>
    </div>
  )
}