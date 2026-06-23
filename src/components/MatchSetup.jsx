function MatchSetup({ setScreen, matchData, setMatchData }) {
  const handleChange = (e) => {
    setMatchData({ ...matchData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-5 flex items-center gap-3">
        <button onClick={() => setScreen('home')} className="text-chalk text-xl">←</button>
        <span className="text-chalk text-lg font-display tracking-tight">NEW MATCH</span>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Match Name</label>
          <input
            name="matchName"
            value={matchData.matchName || ''}
            onChange={handleChange}
            placeholder="Enter match name"
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Tournament (Optional)</label>
          <input
            name="tournament"
            value={matchData.tournament || ''}
            onChange={handleChange}
            placeholder="Enter tournament name"
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Venue</label>
          <input
            name="venue"
            value={matchData.venue || ''}
            onChange={handleChange}
            placeholder="Enter venue"
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={matchData.dateTime || ''}
            onChange={handleChange}
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Match Type</label>
          <select
            name="matchType"
            value={matchData.matchType || ''}
            onChange={handleChange}
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-brass"
          >
            <option value="">Select match type</option>
            <option value="T20">T20</option>
            <option value="ODI">ODI</option>
            <option value="Test">Test</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Total Overs</label>
          <input
            type="number"
            name="overs"
            value={matchData.overs || ''}
            onChange={handleChange}
            placeholder="Enter number of overs"
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-brass"
          />
        </div>

        <div>
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Players per Side</label>
          <input
            type="number"
            name="players"
            value={matchData.players || ''}
            onChange={handleChange}
            placeholder="Enter number of players"
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-brass"
          />
        </div>

        <button
          onClick={() => setScreen('playerEntry')}
          className="w-full bg-brass text-pitch py-4 rounded-xl font-display text-sm tracking-wide border-2 border-pitch mt-2"
          style={{ boxShadow: '4px 4px 0 0 #0F1B12' }}
          onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onMouseUp={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
          onTouchStart={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onTouchEnd={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
        >
          CREATE MATCH
        </button>
      </div>
    </div>
  )
}

export default MatchSetup