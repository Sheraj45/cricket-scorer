function HomeScreen({ setScreen }) {
  return (
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-5 flex items-center justify-between">
        <div>
          <p className="text-brass text-[10px] tracking-[0.2em] uppercase font-mono">Welcome back</p>
          <span className="text-chalk text-xl font-display tracking-tight">SCORE MAKER</span>
        </div>
        <span className="text-2xl">🔔</span>
      </div>

      <div className="p-5 flex flex-col gap-3 mt-2">
        <button
  onClick={() => setScreen('matchSetup')}
  className="w-full bg-brass text-pitch py-5 rounded-xl font-display text-base tracking-wide border-2 border-pitch transition-all duration-100"
  style={{ boxShadow: '4px 4px 0 0 #0F1B12' }}
  onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
  onMouseUp={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
  onTouchStart={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
  onTouchEnd={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
>
  + NEW MATCH
</button>

        <button
          onClick={() => setScreen('myMatches')}
          className="w-full bg-pitch text-chalk py-4 rounded-xl font-body font-semibold text-sm tracking-wide border-2 border-pitch"
        >
          MY MATCHES
        </button>


        <button
  onClick={() => setScreen('teams')}
  className="w-full bg-white text-slate py-4 rounded-xl font-body font-semibold text-sm tracking-wide border-2 border-slate/15"
>
  TEAMS
</button>

        <button
  onClick={() => setScreen('settings')}
  className="w-full bg-white text-slate py-4 rounded-xl font-body font-semibold text-sm tracking-wide border-2 border-slate/15"
>
  SETTINGS
</button>
      </div>
    </div>
  )
}

export default HomeScreen