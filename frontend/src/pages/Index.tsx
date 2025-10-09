import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Workflow, Check, Mail, User, Lock } from 'lucide-react'
import { 
  FaShieldAlt, 
  FaCogs, 
  FaEye, 
  FaBug, 
  FaCodeBranch, 
  FaRocket,
  FaLock,
  FaUserShield
} from 'react-icons/fa'

export default function Index() {
  const [stats, setStats] = React.useState({ total: 0, fails: 0, passRate: 0 })
  const [health, setHealth] = React.useState<'ok' | 'down'>('down')

  React.useEffect(() => {
    fetch(`/evidence/vulnerability_test_results.json?t=${Date.now()}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        const total = data.total_tests ?? data.summary?.total_tests ?? (Array.isArray(data.results) ? data.results.length : 0)
        const failed = data.failed_tests ?? data.summary?.failed ?? (Array.isArray(data.results) ? data.results.filter((r: any) => r.status === 'fail').length : 0)
        const passRate = total ? Math.round(((total - failed) / total) * 100) : 0
        setStats({ total, fails: failed, passRate })
      })
      .catch(() => {})

    fetch(`/evidence/sidecar.log.jsonl?t=${Date.now()}`, { cache: 'no-store' })
      .then(() => setHealth('ok'))
      .catch(() => setHealth('down'))
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Minimal touch purple-blue gradient background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-blue-900/8 to-indigo-900/10"></div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-pink-800/5 via-purple-800/3 to-blue-800/5"></div>
      
      {/* Content */}
      <div className="relative z-10 space-y-24 px-6">
      {/* HERO */}
      <section className="relative overflow-hidden pt-2 md:pt-10 mb-16 md:mb-20">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex text-base px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 mb-1">Secure your data</span>
        </div>
        {/* Central illustration with buttons positioned on red marks */}
        <div className="relative mt-1 md:mt-6 flex justify-center">
          {/* Complete hero illustration with all badges */}
          <img src="/final.png" alt="LLM security illustration with badges" className="w-[600px] md:w-[800px] lg:w-[1000px] drop-shadow-[0_0_60px_rgba(124,58,237,0.45)]" />
          {/* Buttons positioned on the red marks */}
          <Link to="/docs" className="absolute left-[35%] top-[90%] px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-base backdrop-blur-sm border border-white/20 font-medium transition-all duration-200 shadow-lg">Docs</Link>
          <Link to="/playground" className="absolute right-[35%] top-[90%] px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-base backdrop-blur-sm font-medium transition-all duration-200 shadow-lg">Use it Now</Link>
        </div>
      </section>

      {/* SERVICES */}
      <section>
        <div className="text-center mb-10">
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-900/30 text-purple-300 border border-purple-700/50">Services</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">See our services for <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">secure your Data</span></h2>
          <p className="text-white/60 mt-3">We make LLMs safe, auditable, and enterprise-ready.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card icon={FaBug} title="Red-Team Harness" body="Automated red-teaming for LLM applications, identifying vulnerabilities and weaknesses." link="/attack-demo" />
          <Card icon={FaRocket} title="CI/CD Gatekeeper" body="Integrate security checks into your CI/CD pipeline, ensuring secure deployments." link="/reports" />
          <Card icon={FaEye} title="Runtime Sidecar" body="Real-time monitoring and protection of your LLM applications during runtime." link="/evidence" />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 -mx-6 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Why <span className="text-purple-400">choose us</span>
            </h2>
            <p className="text-white/60">Secure, monitor, and optimize your LLM ecosystem.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Secure All Data */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-400/40 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Secure All Data</h3>
              </div>
              <ul className="space-y-4 text-white/80">
                <Bullet>It detects the prompt injection vulnerability and maps it to OWASP LLM01: Prompt Injection.</Bullet>
                <Bullet>The GitHub/GitLab pipeline runs our harness automatically on every pull request.</Bullet>
                <Bullet>Once deployed, our sidecar proxy sits between users and the model.</Bullet>
                <Bullet>If someone tries prompt injection again, it catches it in real‑time.</Bullet>
              </ul>
            </div>
            
            {/* Right side - secure.png image */}
            <div className="justify-self-center">
              <img src="/secure.png" alt="Secure illustration with shield, lock and email cards" className="w-full max-w-md h-auto" />
            </div>
          </div>
      </section>

      {/* CTA */}
      <section className="text-center py-6">
        <h3 className="text-3xl md:text-4xl font-extrabold">Be Part of the Future
          <br />
          of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">AI Security.</span>
        </h3>
        <p className="text-white/70 mt-3">Unleash the power of intelligence, trust, and automation within IdentityHub — where AI meets protection.</p>
        <Link to="/playground" className="inline-block mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-lg font-medium transition-all duration-200 shadow-lg">Start</Link>
        <div className="mt-6 text-xs text-white/60">© MLSecOps</div>
      </section>

      </div>
    </div>
  )
}

function Card({ title, body, link, icon: IconComponent }: { title: string; body: string; link: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="relative rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-b from-white/5 to-transparent overflow-hidden group hover:border-purple-400/40 transition-all duration-300">
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-7 h-7 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-white/70 mb-4 leading-relaxed">{body}</p>
        <Link to={link} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm text-white/80 hover:text-white transition-all duration-200 border border-white/10 group-hover:border-purple-400/30">
          Explore More <span className="text-purple-300">›</span>
        </Link>
      </div>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </li>
  )
}

function Stat({ title, value, color }: { title: string; value: React.ReactNode; color: string }) {
  return (
    <div className="rounded-xl p-6 border border-white/10 bg-white/5">
      <div className="text-sm text-white/60 mb-1">{title}</div>
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
    </div>
  )
}