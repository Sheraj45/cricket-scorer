function TossScreen({ setScreen, matchData, setMatchData }) {
  const handleToss = (choice) => {
    setMatchData({ ...matchData, tossWinner: matchData.team1Name, tossChoice: choice })
    setScreen('liveScore')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={() => setScreen('playerEntry')} className="text-white text-xl">←</button>
        <span className="text-white text-lg font-bold">Toss</span>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <p className="text-gray-500 text-sm mb-1">Match</p>
          <p className="text-gray-800 font-bold text-lg">{matchData.matchName || 'Cricket Match'}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🏏</span>
              </div>
              <p className="text-sm font-bold text-blue-600">{matchData.team1Name || 'Team 1'}</p>
            </div>
            <p className="text-gray-400 font-bold text-xl">VS</p>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🏏</span>
              </div>
              <p className="text-sm font-bold text-green-600">{matchData.team2Name || 'Team 2'}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-gray-600 text-sm font-medium">Toss Winner</label>
          <select
            value={matchData.tossWinner || ''}
            onChange={(e) => setMatchData({ ...matchData, tossWinner: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Select team</option>
            <option value={matchData.team1Name}>{matchData.team1Name}</option>
            <option value={matchData.team2Name}>{matchData.team2Name}</option>
          </select>
        </div>

        <div className="mb-8">
          <label className="text-gray-600 text-sm font-medium block mb-3">Elected to</label>
          <div className="flex gap-4">
            <button
              onClick={() => setMatchData({ ...matchData, tossChoice: 'bat' })}
              className={`flex-1 py-4 rounded-xl font-bold border-2 transition-all ${
                matchData.tossChoice === 'bat'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-600'
              }`}
            >
              🏏 BAT
            </button>
            <button
              onClick={() => setMatchData({ ...matchData, tossChoice: 'bowl' })}
              className={`flex-1 py-4 rounded-xl font-bold border-2 transition-all ${
                matchData.tossChoice === 'bowl'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-600'
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
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg"
        >
          START MATCH
        </button>
      </div>
    </div>
  )
}

export default TossScreen