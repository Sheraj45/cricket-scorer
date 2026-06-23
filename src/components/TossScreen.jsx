function TossScreen({ setScreen, matchData, setMatchData }) {
  return (
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-5 flex items-center gap-3">
        <button onClick={() => setScreen('playerEntry')} className="text-chalk text-xl">←</button>
        <span className="text-chalk text-lg font-display tracking-tight">TOSS</span>
      </div>

      <div className="p-5">
        <div className="bg-pitch rounded-2xl p-6 mb-6 border-2 border-brass">
          <p className="text-brass text-[10px] font-mono uppercase tracking-wide mb-1">Match</p>
          <p className="text-chalk font-display text-base tracking-tight">{matchData.matchName || 'CRICKET MATCH'}</p>
          <div className="flex items-center justify-between mt-5">
            <div className="text-center">
              <div className="w-16 h-16 bg-brass/15 border-2 border-brass rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🏏</span>
              </div>
              <p className="text-xs font-bold text-chalk">{matchData.team1Name || 'Team 1'}</p>
            </div>
            <p className="text-brass font-display text-sm">VS</p>
            <div className="text-center">
              <div className="w-16 h-16 bg-brass/15 border-2 border-brass rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🏏</span>
              </div>
              <p className="text-xs font-bold text-chalk">{matchData.team2Name || 'Team 2'}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Toss Winner</label>
          <select
            value={matchData.tossWinner || ''}
            onChange={(e) => setMatchData({ ...matchData, tossWinner: e.target.value })}
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-brass"
          >
            <option value="">Select team</option>
            <option value={matchData.team1Name}>{matchData.team1Name}</option>
            <option value={matchData.team2Name}>{matchData.team2Name}</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide block mb-3">Elected to</label>
          <div className="flex gap-4">
            <button
              onClick={() => setMatchData({ ...matchData, tossChoice: 'bat' })}
              className={`flex-1 py-4 rounded-xl font-display text-sm border-2 transition-all ${
                matchData.tossChoice === 'bat'
                  ? 'bg-brass text-pitch border-pitch'
                  : 'bg-white text-slate border-slate/15'
              }`}
            >
              🏏 BAT
            </button>
            <button
              onClick={() => setMatchData({ ...matchData, tossChoice: 'bowl' })}
              className={`flex-1 py-4 rounded-xl font-display text-sm border-2 transition-all ${
                matchData.tossChoice === 'bowl'
                  ? 'bg-brass text-pitch border-pitch'
                  : 'bg-white text-slate border-slate/15'
              }`}
            >
              🎯 BOWL
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            if (!matchData.tossWinner || !matchData.tossChoice) {
              alert('Please select toss winner and choice!')
              return
            }
            const battingFirst = matchData.tossChoice === 'bat'
              ? matchData.tossWinner
              : matchData.tossWinner === matchData.team1Name
                ? matchData.team2Name
                : matchData.team1Name
            setMatchData({ ...matchData, battingFirst })
            setScreen('liveScore')
          }}
          className="w-full bg-brass text-pitch py-4 rounded-xl font-display text-sm tracking-wide border-2 border-pitch"
          style={{ boxShadow: '4px 4px 0 0 #0F1B12' }}
          onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onMouseUp={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
          onTouchStart={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onTouchEnd={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
        >
          START MATCH
        </button>
      </div>
    </div>
  )
}

export default TossScreen