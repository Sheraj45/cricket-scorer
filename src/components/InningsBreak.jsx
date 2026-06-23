function InningsBreak({ setScreen, matchData }) {
  const { innings1, team1Name, team2Name, battingFirst, target, overs } = matchData
  const balls = innings1?.balls || 0

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-blue-600 px-4 py-4">
        <h2 className="text-white text-lg font-bold">Innings Break</h2>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm mb-1">1st Innings</p>
          <p className="text-2xl font-bold text-gray-800">
            {innings1?.runs}/{innings1?.wickets}
          </p>
          <p className="text-gray-500 text-sm">
            {Math.floor(balls / 6)}.{balls % 6} / {overs} overs
          </p>
        </div>

        <div className="bg-blue-600 rounded-2xl p-5 text-center">
          <p className="text-blue-200 text-sm mb-1">{matchData.battingFirst} needs</p>
          <p className="text-4xl font-bold text-white">{target}</p>
          <p className="text-blue-200 text-sm mt-1">runs to win in {overs} overs</p>
        </div>

        <button
          onClick={() => setScreen('liveScore')}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg mt-4"
        >
          START 2ND INNINGS →
        </button>
      </div>
    </div>
  )
}

export default InningsBreak