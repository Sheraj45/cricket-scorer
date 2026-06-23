function MyMatches({ setScreen, matchHistory }) {
  return (
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-5 flex items-center gap-3">
        <button onClick={() => setScreen('home')} className="text-chalk text-xl">←</button>
        <span className="text-chalk text-lg font-display tracking-tight">MY MATCHES</span>
      </div>

      <div className="p-4">
        {matchHistory.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏏</div>
            <p className="text-slate/60 font-body">No matches yet.</p>
            <p className="text-slate/40 text-sm font-mono">Play a match to see it here!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {matchHistory.map(m => (
              <div key={m.id} className="bg-white border-2 border-slate/15 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-display text-sm text-slate">{m.matchName || 'CRICKET MATCH'}</p>
                  <span className="text-[10px] font-mono uppercase bg-outfield/15 text-outfield px-2 py-1 rounded-full border border-outfield/30">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-slate/70 mb-1">
                  {m.team1Name} vs {m.team2Name}
                </p>
                <p className="text-sm font-semibold text-brass">{m.result}</p>
                <div className="flex justify-between mt-2 text-[10px] text-slate/40 font-mono uppercase">
                  <span>{m.date}</span>
                  <span>{m.overs} overs</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyMatches