function InningsBreak({ setScreen, matchData }) {
  const { innings1, overs } = matchData
  const balls = innings1?.balls || 0

  return (
    <div className="min-h-screen bg-chalk font-body flex flex-col">
      <div className="bg-pitch px-5 py-5">
        <h2 className="text-chalk text-lg font-display tracking-tight">INNINGS BREAK</h2>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="bg-white border-2 border-slate/15 rounded-2xl p-5">
          <p className="text-slate/50 text-[10px] font-mono uppercase tracking-wide mb-1">1st Innings</p>
          <p className="text-3xl font-mono font-bold text-slate">
            {innings1?.runs}<span className="text-ball">/{innings1?.wickets}</span>
          </p>
          <p className="text-slate/50 text-xs font-mono mt-1">
            {Math.floor(balls / 6)}.{balls % 6} / {overs} overs
          </p>
        </div>

        <div className="bg-pitch border-2 border-brass rounded-2xl p-6 text-center">
          <p className="text-brass text-[10px] font-mono uppercase tracking-wide mb-1">{matchData.battingFirst} needs</p>
          <p className="text-5xl font-mono font-bold text-chalk">{matchData.target}</p>
          <p className="text-chalk/50 text-xs font-mono mt-1">runs to win in {overs} overs</p>
        </div>

        <button
          onClick={() => setScreen('liveScore')}
          className="w-full bg-brass text-pitch py-4 rounded-xl font-display text-sm tracking-wide border-2 border-pitch mt-4"
          style={{ boxShadow: '4px 4px 0 0 #0F1B12' }}
          onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onMouseUp={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
          onTouchStart={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onTouchEnd={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
        >
          START 2ND INNINGS →
        </button>
      </div>
    </div>
  )
}

export default InningsBreak