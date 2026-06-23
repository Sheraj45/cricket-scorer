function MyMatches({ setScreen, matchHistory }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={() => setScreen('home')} className="text-white text-xl">←</button>
        <span className="text-white text-lg font-bold">My Matches</span>
      </div>

      <div className="p-4">
        {matchHistory.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏏</div>
            <p className="text-gray-500">No matches yet.</p>
            <p className="text-gray-400 text-sm">Play a match to see it here!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {matchHistory.map(m => (
              <div key={m.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-gray-800">{m.matchName || 'Cricket Match'}</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {m.team1Name} vs {m.team2Name}
                </p>
                <p className="text-sm font-medium text-blue-600">{m.result}</p>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
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