import { useEffect } from 'react'

function SplashScreen({ setScreen }) {
  useEffect(() => {
    setTimeout(() => {
      setScreen('home')
    }, 3000)
  }, [])

  return (
    <div className="min-h-screen bg-pitch flex flex-col items-center justify-center font-body">
      <div className="w-20 h-20 bg-brass rounded-xl flex items-center justify-center mb-6 rotate-3">
        <span className="text-4xl">🏏</span>
      </div>
      <h1 className="text-2xl font-display text-chalk mb-2 tracking-tight text-center px-8">
        CRICKET<br />SCORE MAKER
      </h1>
      <p className="text-brass text-xs tracking-[0.2em] uppercase mb-12">
        Your Match. Live Score.
      </p>
      <div className="w-48 h-[3px] bg-slate rounded-full overflow-hidden">
        <div className="h-full bg-brass rounded-full animate-pulse w-1/2"></div>
      </div>
      <p className="text-chalk/40 text-xs font-mono mt-3 tracking-widest">LOADING...</p>
    </div>
  )
}

export default SplashScreen