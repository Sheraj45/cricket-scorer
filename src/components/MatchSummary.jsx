function MatchSummary({ setScreen, matchData, setMatchHistory }) {
  const { innings1, innings2, team1Name, team2Name, battingFirst, target } = matchData
  const bowlingFirst = battingFirst === team1Name ? team2Name : team1Name

  let result = ''
  if (innings2?.runs >= target) {
    const wicketsLeft = (matchData.players - 1) - innings2.wickets
    result = `${matchData.battingFirst} won by ${wicketsLeft} wicket${wicketsLeft !== 1 ? 's' : ''}!`
  } else {
    const diff = (innings1?.runs || 0) - (innings2?.runs || 0)
    result = `${bowlingFirst} won by ${diff} run${diff !== 1 ? 's' : ''}!`
  }

  const topBatter = (batters) => {
    if (!batters) return '-'
    return Object.entries(batters)
      .sort((a, b) => b[1].runs - a[1].runs)[0]?.[0] || '-'
  }

  const topBowler = (bowlers) => {
    if (!bowlers) return '-'
    return Object.entries(bowlers)
      .sort((a, b) => b[1].wickets - a[1].wickets)[0]?.[0] || '-'
  }

  const handleSave = () => {
    const saved = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      matchName: matchData.matchName,
      team1Name, team2Name,
      result,
      innings1, innings2,
      overs: matchData.overs,
    }
    setMatchHistory(prev => [saved, ...prev])
    setScreen('home')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 px-4 py-4">
        <h2 className="text-white text-lg font-bold">Match Summary</h2>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
          <p className="text-green-800 font-bold text-xl">{result}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-3">SCORECARD</p>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-bold text-gray-800">{team1Name}</span>
            <span className="text-gray-600">
              {innings1?.runs}/{innings1?.wickets} ({Math.floor((innings1?.balls || 0) / 6)}.{(innings1?.balls || 0) % 6} ov)
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-bold text-gray-800">{team2Name}</span>
            <span className="text-gray-600">
              {innings2?.runs}/{innings2?.wickets} ({Math.floor((innings2?.balls || 0) / 6)}.{(innings2?.balls || 0) % 6} ov)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-3">TOP PERFORMERS</p>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Top Scorer (Inn 1)</span>
            <span className="font-medium text-gray-800">{topBatter(innings1?.batters)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Top Scorer (Inn 2)</span>
            <span className="font-medium text-gray-800">{topBatter(innings2?.batters)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Top Bowler (Inn 1)</span>
            <span className="font-medium text-gray-800">{topBowler(innings1?.bowlers)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600 text-sm">Top Bowler (Inn 2)</span>
            <span className="font-medium text-gray-800">{topBowler(innings2?.bowlers)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold"
          >
            SAVE
          </button>
          <button
            onClick={() => {
              const text = `${matchData.matchName}\n${result}\n${team1Name}: ${innings1?.runs}/${innings1?.wickets}\n${team2Name}: ${innings2?.runs}/${innings2?.wickets}`
              navigator.share ? navigator.share({ title: 'Match Result', text }) : alert(text)
            }}
            className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold"
          >
            SHARE
          </button>
        </div>
      </div>
    </div>
  )
}

export default MatchSummary