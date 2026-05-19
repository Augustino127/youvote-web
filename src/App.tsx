import { useState, useEffect, useRef } from 'react'

// ─── Dark mode hook ───────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true
    return localStorage.getItem('theme') !== 'light'
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, setDark] as const
}

// ─── Animated counter ─────────────────────────────────────────
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      observer.disconnect()
      let start = 0
      const step = target / 60
      const timer = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(timer) }
        else setCount(Math.floor(start))
      }, 16)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{count.toLocaleString('fr-FR')}{suffix}</span>
}

// ─── Scroll reveal hook ───────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ─── Icons as SVG ────────────────────────────────────────────
const IconVote = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>
)
const IconCoins = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const IconFlash = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)
const IconAndroid = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M17.523 15.341a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75zM6.477 15.341a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75zM14.25 17.841a.75.75 0 01-.75.75h-3a.75.75 0 010-1.5h3a.75.75 0 01.75.75zM3.5 9.841h17a.5.5 0 01.5.5v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a.5.5 0 01.5-.5zM8 9.841V8a4 4 0 018 0v1.841"/>
    <circle cx="9" cy="6" r=".75"/>
    <circle cx="15" cy="6" r=".75"/>
    <path d="M6.5 4.5L5 3M17.5 4.5L19 3"/>
  </svg>
)
const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
)
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
)

// ─── Phone mockup component ───────────────────────────────────
function PhoneMockup() {
  const [pts, setPts] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setPts(p => p < 10605 ? Math.min(p + 97, 10605) : 10605), 30)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="phone-mockup animate-float">
      <div className="phone-notch" />
      <div className="phone-screen pt-8">
        {/* Status bar */}
        <div className="absolute top-6 left-0 right-0 flex justify-between px-5 text-xs text-gray-400">
          <span>9:41</span><span>●●●</span>
        </div>

        {/* App header */}
        <div className="w-full text-center mb-4">
          <span className="font-display text-2xl tracking-widest text-gold-400">YOUVOTE</span>
        </div>

        {/* Points display */}
        <div className="w-full bg-gradient-to-br from-gold-500/20 to-forest-500/20 rounded-2xl p-4 mb-4 border border-gold-500/20">
          <p className="text-xs text-gray-400 mb-1">Mes points</p>
          <p className="font-display text-4xl text-gold-400">{pts.toLocaleString('fr-FR')}</p>
          <p className="text-xs text-forest-400 mt-1">≈ {(pts * 0.5).toFixed(0)} FCFA</p>
        </div>

        {/* Vote buttons */}
        <div className="w-full space-y-2">
          {[
            { label: '⚽ Club', pts: '+3 pts', active: true },
            { label: '🏃 Joueur', pts: '+3 pts', active: false },
            { label: '🎯 Coach', pts: '+3 pts', active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex justify-between items-center px-3 py-2 rounded-xl text-xs ${item.active ? 'bg-gold-500/30 border border-gold-500/40' : 'bg-white/5 border border-white/10'}`}
            >
              <span className={item.active ? 'text-gold-300' : 'text-gray-400'}>{item.label}</span>
              <span className="text-forest-400 font-bold">{item.pts}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-around text-gray-600">
          {['🏠', '🏆', '⚡', '💬', '👤'].map(icon => (
            <span key={icon} className="text-lg">{icon}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useDarkMode()
  useReveal()

  const features = [
    {
      icon: <IconVote />,
      title: 'Vote Quotidien',
      desc: 'Vote chaque jour pour ton club, joueur et coach préférés. 9 points à gagner par jour.',
      color: 'text-gold-400',
    },
    {
      icon: <IconTrophy />,
      title: 'Classements',
      desc: 'Grimpe dans le classement national. Des niveaux Fan à Légende à débloquer.',
      color: 'text-forest-400',
    },
    {
      icon: <IconFlash />,
      title: 'Challenges',
      desc: 'Relève des défis hebdomadaires et gagne des points bonus en plus de tes votes.',
      color: 'text-gold-400',
    },
    {
      icon: <IconCoins />,
      title: 'Retire en FCFA',
      desc: 'Convertis tes points en argent réel. 1 pt = 0,5 FCFA. Retrait via Mobile Money.',
      color: 'text-forest-400',
    },
  ]

  const steps = [
    { num: '01', title: 'Inscris-toi', desc: 'Crée ton compte en 2 minutes avec ton numéro et un email.' },
    { num: '02', title: 'Vote chaque jour', desc: 'Choisis ton club, joueur et coach. Regarde des pubs bonus.' },
    { num: '03', title: 'Encaisse', desc: 'Atteins le seuil minimum et retire via Mobile Money.' },
  ]

  return (
    <div className={`min-h-screen font-body ${dark ? 'dark' : ''}`}>
      <div className="dark:bg-charcoal-900 bg-white transition-colors duration-300">

        {/* ── Navbar ─────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/80 dark:bg-charcoal-900/80 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <span className="font-display text-2xl tracking-widest dark:text-white text-gray-900">YOUVOTE</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="hidden md:block text-sm text-gray-500 dark:text-gray-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors">Fonctionnalités</a>
            <a href="#download" className="hidden md:block text-sm text-gray-500 dark:text-gray-400 hover:text-gold-500 dark:hover:text-gold-400 transition-colors">Télécharger</a>
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gold-400/20 transition-colors"
            >
              {dark ? <IconSun /> : <IconMoon />}
            </button>
          </div>
        </nav>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden kente-bg">
          {/* Background glow */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-forest-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center w-full">
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="reveal">
                <span className="section-eyebrow">🌍 Bénin · Afrique de l'Ouest</span>
                <h1 className="font-display text-6xl md:text-8xl leading-none dark:text-white text-gray-900 mt-2">
                  VOTE.<br/>
                  <span className="text-gold-500">GAGNE.</span><br/>
                  ENCAISSE.
                </h1>
              </div>
              <p className="reveal text-lg text-gray-600 dark:text-gray-300 max-w-md leading-relaxed" style={{ animationDelay: '0.2s' }}>
                L'application qui récompense ta passion pour le football. Vote pour ton club, accumule des points et retire de l'argent réel en FCFA.
              </p>
              <div className="reveal flex flex-wrap gap-4" style={{ animationDelay: '0.4s' }}>
                <a href="#download" className="btn-gold inline-flex items-center gap-3">
                  <span className="inline-flex items-center gap-3 relative z-10">
                    <IconAndroid />
                    Télécharger l'APK Android
                  </span>
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white rounded-sm font-display tracking-wider text-xl hover:border-gold-500 transition-colors"
                >
                  Comment ça marche
                </a>
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div className="reveal flex justify-center" style={{ animationDelay: '0.3s' }}>
              <div className="animate-pulse-gold rounded-[40px]">
                <PhoneMockup />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <div className="w-px h-12 bg-gradient-to-b from-gold-400 to-transparent animate-pulse" />
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────────────── */}
        <section className="py-16 bg-charcoal-900 dark:bg-black/50">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 9, suffix: ' pts', label: 'Points / jour garantis' },
              { value: 69, suffix: ' pts', label: 'Max quotidien' },
              { value: 30, suffix: ' pts', label: 'Par parrainage' },
              { value: 50, suffix: ' FCFA', label: 'Pour 100 points' },
            ].map((stat) => (
              <div key={stat.label} className="text-center reveal">
                <p className="font-display text-5xl text-gold-400">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────── */}
        <section id="features" className="py-24 dark:bg-charcoal-900 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <p className="section-eyebrow">Pourquoi YouVote ?</p>
              <h2 className="section-title dark:text-white text-gray-900">
                TA PASSION,<br /><span className="text-gold-500">RÉCOMPENSÉE</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <div key={f.title} className="feature-card reveal dark:text-white" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={`${f.color} mb-4`}>{f.icon}</div>
                  <h3 className="font-display text-2xl mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────── */}
        <section id="how-it-works" className="py-24 dark:bg-black/30 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16 reveal">
              <p className="section-eyebrow">Simple comme bonjour</p>
              <h2 className="section-title dark:text-white text-gray-900">
                COMMENT<br /><span className="text-forest-400">ÇA MARCHE</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {steps.map((step, i) => (
                <div key={step.num} className="reveal relative" style={{ transitionDelay: `${i * 0.15}s` }}>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold-500/50 to-transparent -translate-y-1/2 z-0" />
                  )}
                  <div className="relative z-10">
                    <span className="font-display text-7xl text-gold-500/20 leading-none">{step.num}</span>
                    <h3 className="font-display text-3xl dark:text-white text-gray-900 -mt-4 mb-3">{step.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Download ───────────────────────────────────────── */}
        <section id="download" className="py-24 relative overflow-hidden bg-charcoal-900">
          <div className="absolute inset-0 kente-bg opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="reveal">
              <p className="section-eyebrow">Disponible maintenant</p>
              <h2 className="section-title text-white mb-6">
                PRÊT À<br /><span className="text-gold-400">GAGNER ?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
                Télécharge l'application Android et commence à voter dès aujourd'hui. Gratuit, sans abonnement.
              </p>
            </div>

            <div className="reveal flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.2s' }}>
              <a
                href="/youvote.apk"
                download="youvote.apk"
                className="btn-gold inline-flex items-center justify-center gap-3 text-lg"
              >
                <span className="inline-flex items-center gap-3 relative z-10">
                  <IconAndroid />
                  Télécharger l'APK Android
                </span>
              </a>
            </div>

            <p className="text-gray-600 text-sm mt-6">
              iOS — Bientôt disponible sur l'App Store
            </p>

            {/* Badges */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto reveal">
              {[
                { emoji: '🔒', label: '100% Sécurisé' },
                { emoji: '⚡', label: 'Rapide & Fiable' },
                { emoji: '🌍', label: 'Made in Bénin' },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{b.emoji}</span>
                  <span className="text-xs text-gray-500">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Admin section ──────────────────────────────────── */}
        <section className="py-16 dark:bg-charcoal-900 bg-gray-50 border-t border-gray-100 dark:border-white/5">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 reveal">
            <div>
              <p className="section-eyebrow">Espace professionnel</p>
              <h3 className="font-display text-3xl dark:text-white text-gray-900 mb-2">TABLEAU DE BORD ADMIN</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Gérez les utilisateurs, les retraits, les challenges et les statistiques depuis le panneau d'administration sécurisé.
              </p>
            </div>
            <a
              href="https://youvote-admin-sooty.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-8 py-4 border border-gold-500/40 text-gold-400 font-display tracking-wider text-xl hover:bg-gold-500/10 transition-colors rounded-sm"
            >
              Accéder à l'Admin →
            </a>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="py-10 bg-charcoal-950 dark:bg-black border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚽</span>
              <span className="font-display text-xl tracking-widest text-gold-400">YOUVOTE</span>
            </div>
            <p className="text-gray-600 text-sm text-center">
              © {new Date().getFullYear()} YouVote — MINERGIE SARL · Bénin, Afrique de l'Ouest
            </p>
            <p className="text-gray-700 text-xs">v1.0.0</p>
          </div>
        </footer>

      </div>
    </div>
  )
}
