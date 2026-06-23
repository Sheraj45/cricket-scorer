function SettingsScreen({ setScreen, setMatchHistory, setTeams }) {
  const handleClearData = () => {
    if (confirm('This will permanently delete all saved matches and teams. Continue?')) {
      setMatchHistory([])
      setTeams([])
      localStorage.removeItem('cricket_match_history')
      localStorage.removeItem('cricket_teams')
      alert('All data cleared.')
    }
  }

  return (
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-5 flex items-center gap-3">
        <button onClick={() => setScreen('home')} className="text-chalk text-xl">←</button>
        <span className="text-chalk text-lg font-display tracking-tight">SETTINGS</span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="bg-white border-2 border-slate/15 rounded-2xl p-5">
          <p className="text-slate/50 text-[10px] font-mono uppercase tracking-wide mb-3">Data</p>
          <button
            onClick={handleClearData}
            className="w-full bg-ball/10 text-ball border-2 border-ball py-3 rounded-lg font-mono text-xs uppercase tracking-wide"
          >
            🗑 Clear All Saved Data
          </button>
          <p className="text-slate/40 text-[11px] mt-2">
            Removes all saved matches and teams from this device.
          </p>
        </div>

        <div className="bg-pitch border-2 border-brass rounded-2xl p-5">
          <p className="text-brass text-[10px] font-mono uppercase tracking-wide mb-2">About</p>
          <p className="text-chalk font-display text-base tracking-tight mb-1">CRICKET SCORE MAKER</p>
          <p className="text-chalk/60 text-xs font-mono">Version 1.0.0</p>
          <p className="text-chalk/60 text-xs font-mono mt-3">Made by Mohammed Sheraj </p>
          <p className="text-chalk/40 text-[11px] mt-3">
            Built for street cricket and local tournaments — score every ball, every over, every match.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsScreen