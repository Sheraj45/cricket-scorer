import { useState } from 'react'

function LiveScore({ setScreen, matchData, setMatchData }) {
  const totalBalls = parseInt(matchData.overs) * 6
  const battingTeamName = matchData.battingFirst
  const bowlingTeamName = battingTeamName === matchData.team1Name
    ? matchData.team2Name
    : matchData.team1Name
  const battingPlayers = battingTeamName === matchData.team1Name
    ? matchData.team1Players
    : matchData.team2Players
  const bowlingPlayers = bowlingTeamName === matchData.team1Name
    ? matchData.team1Players
    : matchData.team2Players

  const [runs, setRuns] = useState(0)
  const [wickets, setWickets] = useState(0)
  const [balls, setBalls] = useState(0)
  const [thisOver, setThisOver] = useState([])
  const [striker, setStriker] = useState(battingPlayers[0] || 'Batter 1')
  const [nonStriker, setNonStriker] = useState(battingPlayers[1] || 'Batter 2')
  const [bowler, setBowler] = useState(bowlingPlayers[0] || 'Bowler 1')
  const [batters, setBatters] = useState(() => {
    const obj = {}
    battingPlayers.forEach(p => {
      obj[p] = { runs: 0, balls: 0, fours: 0, sixes: 0, out: false }
    })
    return obj
  })
  const [bowlers, setBowlers] = useState(() => {
    const obj = {}
    bowlingPlayers.forEach(p => {
      obj[p] = { overs: 0, balls: 0, runs: 0, wickets: 0 }
    })
    return obj
  })
  const [history, setHistory] = useState([])
  const [needNewBowler, setNeedNewBowler] = useState(false)
  const [lastOverBowler, setLastOverBowler] = useState(null)
  const maxOversPerBowler = Math.ceil(parseInt(matchData.overs) / 5)

  const overs = Math.floor(balls / 6)
  const ballsInOver = balls % 6
  const crr = balls > 0 ? (runs / (balls / 6)).toFixed(2) : '0.00'
  const ballsLeft = totalBalls - balls

  const swapStrike = () => {
    setStriker(nonStriker)
    setNonStriker(striker)
  }

  const addDelivery = (run) => {
    const newBalls = balls + 1
    const newRuns = runs + run
    const delivery = { type: run === 4 ? 'four' : run === 6 ? 'six' : 'run', runs: run }

    setHistory([...history, { runs, wickets, balls, thisOver, batters, bowlers, striker, nonStriker }])

    setBatters(prev => ({
      ...prev,
      [striker]: {
        ...prev[striker],
        runs: prev[striker].runs + run,
        balls: prev[striker].balls + 1,
        fours: prev[striker].fours + (run === 4 ? 1 : 0),
        sixes: prev[striker].sixes + (run === 6 ? 1 : 0),
      }
    }))

    setBowlers(prev => ({
      ...prev,
      [bowler]: {
        ...prev[bowler],
        runs: prev[bowler].runs + run,
        balls: prev[bowler].balls + 1,
      }
    }))

    const newThisOver = [...thisOver, delivery]
    if (newBalls % 6 === 0) {
      setThisOver([])
      swapStrike()
      if (newBalls < totalBalls) {
        setLastOverBowler(bowler)
        setNeedNewBowler(true)
      }
    } else {
      setThisOver(newThisOver)
      if (run === 1 || run === 3) swapStrike()
    }

    setBalls(newBalls)
    setRuns(newRuns)

    const targetChased = matchData.currentInnings === 1 && newRuns >= matchData.target
    if (newBalls >= totalBalls || targetChased) {
      setTimeout(() => endInnings(newRuns, wickets, newBalls), 300)
    }
  }

  const addExtra = (type) => {
    setHistory([...history, { runs, wickets, balls, thisOver, batters, bowlers, striker, nonStriker }])
    setRuns(runs + 1)
    const delivery = { type, runs: 1 }
    setThisOver([...thisOver, delivery])
    setBowlers(prev => ({
      ...prev,
      [bowler]: { ...prev[bowler], runs: prev[bowler].runs + 1 }
    }))
  }

  const addWicket = () => {
    setHistory([...history, { runs, wickets, balls, thisOver, batters, bowlers, striker, nonStriker }])
    const newWickets = wickets + 1
    const newBalls = balls + 1

    setBatters(prev => ({
      ...prev,
      [striker]: { ...prev[striker], balls: prev[striker].balls + 1, out: true }
    }))
    setBowlers(prev => ({
      ...prev,
      [bowler]: { ...prev[bowler], balls: prev[bowler].balls + 1, wickets: prev[bowler].wickets + 1 }
    }))

    const newThisOverArr = [...thisOver, { type: 'wicket', runs: 0 }]
    setWickets(newWickets)
    setBalls(newBalls)

    if (newBalls % 6 === 0) {
      setThisOver([])
      if (newBalls < totalBalls && newWickets < battingPlayers.length - 1) {
        setLastOverBowler(bowler)
        setNeedNewBowler(true)
      }
    } else {
      setThisOver(newThisOverArr)
    }

    const nextBatter = battingPlayers.find(
      p => p !== striker && p !== nonStriker && !batters[p]?.out
    )
    if (nextBatter && newWickets < battingPlayers.length - 1) {
      setStriker(nextBatter)
    }

    const targetChased = matchData.currentInnings === 1 && runs >= matchData.target
    if (newWickets >= battingPlayers.length - 1 || newBalls >= totalBalls || targetChased) {
      setTimeout(() => endInnings(runs, newWickets, newBalls), 300)
    }
  }

  const undoLast = () => {
    if (history.length === 0) return
    const last = history[history.length - 1]
    setRuns(last.runs)
    setWickets(last.wickets)
    setBalls(last.balls)
    setThisOver(last.thisOver)
    setBatters(last.batters)
    setBowlers(last.bowlers)
    setStriker(last.striker)
    setNonStriker(last.nonStriker)
    setHistory(history.slice(0, -1))
  }

  const endInnings = (finalRuns, finalWickets, finalBalls) => {
    if (matchData.currentInnings === 1) {
      setMatchData(prev => ({
        ...prev,
        innings2: { runs: finalRuns, wickets: finalWickets, balls: finalBalls, batters, bowlers },
      }))
      setScreen('matchSummary')
    } else {
      setMatchData(prev => ({
        ...prev,
        innings1: { runs: finalRuns, wickets: finalWickets, balls: finalBalls, batters, bowlers },
        battingFirst: bowlingTeamName,
        currentInnings: 1,
        target: finalRuns + 1,
      }))
      setScreen('inningsBreak')
    }
  }

  const getBallDisplay = (d) => {
    if (d.type === 'four') return { label: '4', color: 'bg-outfield/15 text-outfield border-outfield' }
    if (d.type === 'six') return { label: '6', color: 'bg-brass/15 text-brass border-brass' }
    if (d.type === 'wicket') return { label: 'W', color: 'bg-ball/15 text-ball border-ball' }
    if (d.type === 'wide') return { label: 'Wd', color: 'bg-slate/10 text-slate border-slate/30' }
    if (d.type === 'nb') return { label: 'Nb', color: 'bg-slate/10 text-slate border-slate/30' }
    return { label: d.runs, color: 'bg-slate/5 text-slate border-slate/20' }
  }

  return (
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-3 flex items-center justify-between">
        <span className="text-chalk font-display text-sm tracking-tight">{battingTeamName}</span>
        <span className="text-brass text-[10px] font-mono uppercase tracking-wide border border-brass rounded-full px-3 py-1">
          {matchData.currentInnings === 1 ? '2nd Innings' : '1st Innings'}
        </span>
      </div>

      <div className="bg-pitch px-5 pb-6 border-b-4 border-brass">
        <div className="text-chalk text-6xl font-mono font-bold tracking-tight">{runs}<span className="text-brass">/{wickets}</span></div>
        <div className="text-chalk/50 text-xs font-mono mt-1">{overs}.{ballsInOver} / {matchData.overs} OVERS</div>
        <div className="flex gap-3 mt-4">
          <div className="bg-slate/40 border border-brass/30 rounded-lg px-4 py-2 text-center flex-1">
            <div className="text-chalk font-mono font-bold">{crr}</div>
            <div className="text-chalk/50 text-[10px] font-mono uppercase">CRR</div>
          </div>
          <div className="bg-slate/40 border border-brass/30 rounded-lg px-4 py-2 text-center flex-1">
            <div className="text-chalk font-mono font-bold">{ballsLeft}</div>
            <div className="text-chalk/50 text-[10px] font-mono uppercase">Balls Left</div>
          </div>
          {matchData.currentInnings === 1 && (
            <div className="bg-ball/30 border border-ball rounded-lg px-4 py-2 text-center flex-1">
              <div className="text-chalk font-mono font-bold">
                {matchData.target - runs > 0 ? matchData.target - runs : 0}
              </div>
              <div className="text-chalk/50 text-[10px] font-mono uppercase">Need</div>
            </div>
          )}
        </div>
      </div>

      {needNewBowler && (
        <div className="bg-brass/15 border-y-2 border-brass px-5 py-4">
          <p className="text-slate font-display text-xs mb-2">
            OVER COMPLETE — PICK NEXT BOWLER
          </p>
          <select
            className="w-full bg-white border-2 border-brass rounded-lg px-3 py-2 text-sm mb-1"
            onChange={e => {
              setBowler(e.target.value)
              setNeedNewBowler(false)
            }}
            defaultValue=""
          >
            <option value="" disabled>Choose bowler</option>
            {bowlingPlayers
              .filter(p => p !== lastOverBowler)
              .filter(p => Math.floor((bowlers[p]?.balls ?? 0) / 6) < maxOversPerBowler)
              .map(p => {
                const oversBowled = Math.floor((bowlers[p]?.balls ?? 0) / 6)
                return (
                  <option key={p} value={p}>
                    {p} ({oversBowled}/{maxOversPerBowler} overs)
                  </option>
                )
              })}
          </select>
        </div>
      )}

      <div className="px-5 py-4">
        <div className="text-xs text-slate/50 font-mono uppercase tracking-wide mb-2">This Over</div>
        <div className="flex gap-2 flex-wrap">
          {thisOver.map((d, i) => {
            const { label, color } = getBallDisplay(d)
            return (
              <div key={i} className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold ${color}`}>
                {label}
              </div>
            )
          })}
          {thisOver.length === 0 && <span className="text-slate/40 text-sm">No balls yet</span>}
        </div>
      </div>

      <div className="px-5 py-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate/40 text-[10px] font-mono uppercase">
              <th className="text-left py-1">Batsman</th>
              <th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th>
            </tr>
          </thead>
          <tbody>
            {[striker, nonStriker].map(p => (
              <tr key={p} className="border-t border-slate/10">
                <td className="py-2 font-semibold text-slate text-sm">
                  {p} {p === striker ? <span className="text-brass">●</span> : ''}
                </td>
                <td className="text-center font-mono">{batters[p]?.runs ?? 0}</td>
                <td className="text-center font-mono">{batters[p]?.balls ?? 0}</td>
                <td className="text-center font-mono">{batters[p]?.fours ?? 0}</td>
                <td className="text-center font-mono">{batters[p]?.sixes ?? 0}</td>
                <td className="text-center font-mono">
                  {batters[p]?.balls > 0
                    ? ((batters[p].runs / batters[p].balls) * 100).toFixed(0)
                    : '0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate/40 text-[10px] font-mono uppercase">
              <th className="text-left py-1">Bowler</th>
              <th>O</th><th>R</th><th>W</th><th>Econ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate/10">
              <td className="py-2 font-semibold text-slate text-sm">{bowler}</td>
              <td className="text-center font-mono">
                {Math.floor((bowlers[bowler]?.balls ?? 0) / 6)}.{(bowlers[bowler]?.balls ?? 0) % 6}
              </td>
              <td className="text-center font-mono">{bowlers[bowler]?.runs ?? 0}</td>
              <td className="text-center font-mono">{bowlers[bowler]?.wickets ?? 0}</td>
              <td className="text-center font-mono">
                {bowlers[bowler]?.balls > 0
                  ? (bowlers[bowler].runs / (bowlers[bowler].balls / 6)).toFixed(1)
                  : '0.0'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-5 py-2 flex gap-2">
        <div className="flex-1">
          <label className="text-[10px] text-slate/50 font-mono uppercase">Striker</label>
          <select
            value={striker}
            onChange={e => setStriker(e.target.value)}
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-2 py-2 text-sm mt-1"
          >
            {battingPlayers
              .filter(p => !batters[p]?.out || p === striker)
              .map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-[10px] text-slate/50 font-mono uppercase">Non-striker</label>
          <select
            value={nonStriker}
            onChange={e => setNonStriker(e.target.value)}
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-2 py-2 text-sm mt-1"
          >
            {battingPlayers
              .filter(p => !batters[p]?.out || p === nonStriker)
              .map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="px-5 py-2">
        <label className="text-[10px] text-slate/50 font-mono uppercase">
          Bowler <span className="text-slate/30">(max {maxOversPerBowler} ov)</span>
        </label>
        <select
          value={bowler}
          onChange={e => setBowler(e.target.value)}
          className="w-full bg-white border-2 border-slate/15 rounded-lg px-2 py-2 text-sm mt-1"
          disabled={needNewBowler}
        >
          {bowlingPlayers.map(p => {
            const oversBowled = Math.floor((bowlers[p]?.balls ?? 0) / 6)
            return (
              <option key={p} value={p}>
                {p} ({oversBowled}/{maxOversPerBowler} ov)
              </option>
            )
          })}
        </select>
      </div>

      <div className="px-5 py-4">
        <div className="text-xs text-slate/50 font-mono uppercase tracking-wide mb-2">Score Entry</div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {[0, 1, 2, 3].map(r => (
            <button key={r} onClick={() => addDelivery(r)} disabled={needNewBowler}
              className="py-4 bg-white border-2 border-slate/15 rounded-xl font-mono font-bold text-lg text-slate disabled:opacity-30">
              {r}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button onClick={() => addDelivery(4)} disabled={needNewBowler}
            className="py-4 bg-outfield/15 border-2 border-outfield rounded-xl font-mono font-bold text-lg text-outfield disabled:opacity-30">4</button>
          <button onClick={() => addDelivery(6)} disabled={needNewBowler}
            className="py-4 bg-brass/15 border-2 border-brass rounded-xl font-mono font-bold text-lg text-brass disabled:opacity-30">6</button>
          <button onClick={() => addExtra('wide')} disabled={needNewBowler}
            className="py-4 bg-slate/5 border-2 border-slate/20 rounded-xl font-mono font-bold text-sm text-slate disabled:opacity-30">WD</button>
          <button onClick={() => addExtra('nb')} disabled={needNewBowler}
            className="py-4 bg-slate/5 border-2 border-slate/20 rounded-xl font-mono font-bold text-sm text-slate disabled:opacity-30">NB</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <button onClick={() => addExtra('bye')} disabled={needNewBowler}
            className="py-4 bg-slate/5 border-2 border-slate/20 rounded-xl font-mono font-bold text-sm text-slate disabled:opacity-30">BYE</button>
          <button onClick={() => addExtra('lb')} disabled={needNewBowler}
            className="py-4 bg-slate/5 border-2 border-slate/20 rounded-xl font-mono font-bold text-sm text-slate disabled:opacity-30">LB</button>
          <button onClick={undoLast}
            className="py-4 bg-slate/5 border-2 border-slate/20 rounded-xl font-mono font-bold text-sm text-slate">↩ UNDO</button>
        </div>
        <button onClick={addWicket} disabled={needNewBowler}
          className="w-full py-4 bg-ball text-chalk rounded-xl font-display text-sm mb-2 disabled:opacity-30">
          WICKET!
        </button>
        <button onClick={() => endInnings(runs, wickets, balls)}
          className="w-full py-3 bg-slate/10 text-slate rounded-xl font-mono text-xs uppercase tracking-wide">
          End Innings
        </button>
      </div>
    </div>
  )
}

export default LiveScore