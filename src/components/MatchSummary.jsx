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
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-5">
        <h2 className="text-chalk text-lg font-display tracking-tight">MATCH SUMMARY</h2>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="bg-outfield/10 border-2 border-outfield rounded-2xl p-5 text-center">
          <p className="text-outfield font-display text-lg">{result}</p>
        </div>

        <div className="bg-white border-2 border-slate/15 rounded-2xl p-5">
          <p className="text-slate/50 text-[10px] font-mono uppercase tracking-wide mb-3">Scorecard</p>
          <div className="flex justify-between py-2 border-b border-slate/10">
            <span className="font-display text-xs text-slate">{team1Name}</span>
            <span className="text-slate/70 font-mono text-sm">
              {innings1?.runs}/{innings1?.wickets} ({Math.floor((innings1?.balls || 0) / 6)}.{(innings1?.balls || 0) % 6})
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-display text-xs text-slate">{team2Name}</span>
            <span className="text-slate/70 font-mono text-sm">
              {innings2?.runs}/{innings2?.wickets} ({Math.floor((innings2?.balls || 0) / 6)}.{(innings2?.balls || 0) % 6})
            </span>
          </div>
        </div>

        <div className="bg-white border-2 border-slate/15 rounded-2xl p-5">
          <p className="text-slate/50 text-[10px] font-mono uppercase tracking-wide mb-3">Top Performers</p>
          <div className="flex justify-between py-2 border-b border-slate/10">
            <span className="text-slate/60 text-xs font-mono uppercase">Top Scorer (Inn 1)</span>
            <span className="font-semibold text-slate text-sm">{topBatter(innings1?.batters)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate/10">
            <span className="text-slate/60 text-xs font-mono uppercase">Top Scorer (Inn 2)</span>
            <span className="font-semibold text-slate text-sm">{topBatter(innings2?.batters)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate/10">
            <span className="text-slate/60 text-xs font-mono uppercase">Top Bowler (Inn 1)</span>
            <span className="font-semibold text-slate text-sm">{topBowler(innings1?.bowlers)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate/60 text-xs font-mono uppercase">Top Bowler (Inn 2)</span>
            <span className="font-semibold text-slate text-sm">{topBowler(innings2?.bowlers)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-brass text-pitch py-4 rounded-xl font-display text-sm border-2 border-pitch"
            style={{ boxShadow: '4px 4px 0 0 #0F1B12' }}
            onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
            onMouseUp={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
            onTouchStart={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
            onTouchEnd={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
          >
            SAVE
          </button>
          <button
            onClick={() => {
              const text = `${matchData.matchName}\n${result}\n${team1Name}: ${innings1?.runs}/${innings1?.wickets}\n${team2Name}: ${innings2?.runs}/${innings2?.wickets}`
              navigator.share ? navigator.share({ title: 'Match Result', text }) : alert(text)
            }}
            className="flex-1 bg-white border-2 border-pitch text-pitch py-4 rounded-xl font-display text-sm"
          >
            SHARE
          </button>
        </div>
      </div>
    </div>
  )
}

export default MatchSummary