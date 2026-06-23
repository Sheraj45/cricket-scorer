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
    } else {
      setThisOver(newThisOver)
      if (run === 1 || run === 3) swapStrike()
    }

    setBalls(newBalls)
    setRuns(newRuns)

    if (newBalls >= totalBalls) {
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

    setThisOver([...thisOver, { type: 'wicket', runs: 0 }])
    setWickets(newWickets)
    setBalls(newBalls)

    if (newWickets >= battingPlayers.length - 1 || newBalls >= totalBalls) {
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
    if (d.type === 'four') return { label: '4', color: 'bg-blue-100 text-blue-700 border-blue-300' }
    if (d.type === 'six') return { label: '6', color: 'bg-green-100 text-green-700 border-green-300' }
    if (d.type === 'wicket') return { label: 'W', color: 'bg-red-100 text-red-700 border-red-300' }
    if (d.type === 'wide') return { label: 'Wd', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' }
    if (d.type === 'nb') return { label: 'Nb', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' }
    return { label: d.runs, color: 'bg-gray-100 text-gray-700 border-gray-300' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
        <span className="text-white font-bold">{battingTeamName} batting</span>
        <span className="text-blue-200 text-sm">
          {matchData.currentInnings === 1 ? '2nd Innings' : '1st Innings'}
        </span>
      </div>

      <div className="bg-blue-600 px-4 pb-5">
        <div className="text-white text-5xl font-bold">{runs}/{wickets}</div>
        <div className="text-blue-200 text-sm mt-1">{overs}.{ballsInOver} / {matchData.overs} overs</div>
        <div className="flex gap-4 mt-3">
          <div className="bg-blue-500 rounded-lg px-4 py-2 text-center">
            <div className="text-white font-bold">{crr}</div>
            <div className="text-blue-200 text-xs">CRR</div>
          </div>
          <div className="bg-blue-500 rounded-lg px-4 py-2 text-center">
            <div className="text-white font-bold">{ballsLeft}</div>
            <div className="text-blue-200 text-xs">Balls Left</div>
          </div>
          {matchData.currentInnings === 1 && (
            <div className="bg-blue-500 rounded-lg px-4 py-2 text-center">
              <div className="text-white font-bold">
                {matchData.target - runs > 0 ? matchData.target - runs : 0}
              </div>
              <div className="text-blue-200 text-xs">Need</div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="text-xs text-gray-500 font-medium mb-2">THIS OVER</div>
        <div className="flex gap-2 flex-wrap">
          {thisOver.map((d, i) => {
            const { label, color } = getBallDisplay(d)
            return (
              <div key={i} className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${color}`}>
                {label}
              </div>
            )
          })}
          {thisOver.length === 0 && <span className="text-gray-400 text-sm">No balls yet</span>}
        </div>
      </div>

      <div className="px-4 py-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-xs">
              <th className="text-left py-1">BATSMAN</th>
              <th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th>
            </tr>
          </thead>
          <tbody>
            {[striker, nonStriker].map(p => (
              <tr key={p} className="border-t border-gray-100">
                <td className="py-2 font-medium text-gray-800">
                  {p} {p === striker ? '●' : ''}
                </td>
                <td className="text-center">{batters[p]?.runs ?? 0}</td>
                <td className="text-center">{batters[p]?.balls ?? 0}</td>
                <td className="text-center">{batters[p]?.fours ?? 0}</td>
                <td className="text-center">{batters[p]?.sixes ?? 0}</td>
                <td className="text-center">
                  {batters[p]?.balls > 0
                    ? ((batters[p].runs / batters[p].balls) * 100).toFixed(0)
                    : '0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-xs">
              <th className="text-left py-1">BOWLER</th>
              <th>O</th><th>R</th><th>W</th><th>Econ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-100">
              <td className="py-2 font-medium text-gray-800">{bowler}</td>
              <td className="text-center">
                {Math.floor((bowlers[bowler]?.balls ?? 0) / 6)}.{(bowlers[bowler]?.balls ?? 0) % 6}
              </td>
              <td className="text-center">{bowlers[bowler]?.runs ?? 0}</td>
              <td className="text-center">{bowlers[bowler]?.wickets ?? 0}</td>
              <td className="text-center">
                {bowlers[bowler]?.balls > 0
                  ? (bowlers[bowler].runs / (bowlers[bowler].balls / 6)).toFixed(1)
                  : '0.0'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 flex gap-2">
        <div className="flex-1">
          <label className="text-xs text-gray-500">Striker</label>
          <select
            value={striker}
            onChange={e => setStriker(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm mt-1"
          >
            {battingPlayers.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500">Non-striker</label>
          <select
            value={nonStriker}
            onChange={e => setNonStriker(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm mt-1"
          >
            {battingPlayers.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="px-4 py-2">
        <label className="text-xs text-gray-500">Bowler</label>
        <select
          value={bowler}
          onChange={e => setBowler(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm mt-1"
        >
          {bowlingPlayers.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="px-4 py-3">
        <div className="text-xs text-gray-500 font-medium mb-2">SCORE ENTRY</div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {[0, 1, 2, 3].map(r => (
            <button key={r} onClick={() => addDelivery(r)}
              className="py-4 bg-white border border-gray-300 rounded-xl font-bold text-lg text-gray-700">
              {r}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <button onClick={() => addDelivery(4)}
            className="py-4 bg-blue-50 border border-blue-300 rounded-xl font-bold text-lg text-blue-700">4</button>
          <button onClick={() => addDelivery(6)}
            className="py-4 bg-green-50 border border-green-300 rounded-xl font-bold text-lg text-green-700">6</button>
          <button onClick={() => addExtra('wide')}
            className="py-4 bg-yellow-50 border border-yellow-300 rounded-xl font-bold text-sm text-yellow-700">WD</button>
          <button onClick={() => addExtra('nb')}
            className="py-4 bg-yellow-50 border border-yellow-300 rounded-xl font-bold text-sm text-yellow-700">NB</button>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <button onClick={() => addExtra('bye')}
            className="py-4 bg-gray-50 border border-gray-300 rounded-xl font-bold text-sm text-gray-700">BYE</button>
          <button onClick={() => addExtra('lb')}
            className="py-4 bg-gray-50 border border-gray-300 rounded-xl font-bold text-sm text-gray-700">LB</button>
          <button onClick={undoLast}
            className="py-4 bg-gray-50 border border-gray-300 rounded-xl font-bold text-sm text-gray-700">↩ UNDO</button>
        </div>
        <button onClick={addWicket}
          className="w-full py-4 bg-red-500 text-white rounded-xl font-bold text-lg mb-2">
          WICKET!
        </button>
        <button onClick={() => endInnings(runs, wickets, balls)}
          className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-bold text-sm">
          END INNINGS
        </button>
      </div>
    </div>
  )
}

export default LiveScore