import { useEffect } from 'react'

function SplashScreen({ setScreen }) {
  useEffect(() => {
    setTimeout(() => {
      setScreen('home')
    }, 3000)
  }, [])

  return (
    <div className="min-h-screen bg-blue-600 flex flex-col items-center justify-center">
      <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6">
        <span className="text-5xl">🏏</span>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Cricket Score Maker</h1>
      <p className="text-blue-200 text-sm mb-12">Your Match. Live Score.</p>
      <div className="w-48 h-1 bg-blue-400 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full animate-pulse w-1/2"></div>
      </div>
      <p className="text-blue-300 text-xs mt-3">LOADING...</p>
    </div>
  )
}

export default SplashScreen