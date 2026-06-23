import { useState } from 'react'

function PlayerEntry({ setScreen, matchData, setMatchData }) {
  const playerCount = parseInt(matchData.players) || 11
  const [team1, setTeam1] = useState(matchData.team1Name || '')
  const [team2, setTeam2] = useState(matchData.team2Name || '')
  const [team1Players, setTeam1Players] = useState(
    matchData.team1Players || Array(playerCount).fill('')
  )
  const [team2Players, setTeam2Players] = useState(
    matchData.team2Players || Array(playerCount).fill('')
  )
  const [activeTeam, setActiveTeam] = useState(1)

  const updatePlayer = (team, index, value) => {
    if (team === 1) {
      const updated = [...team1Players]
      updated[index] = value
      setTeam1Players(updated)
    } else {
      const updated = [...team2Players]
      updated[index] = value
      setTeam2Players(updated)
    }
  }

  const handleNext = () => {
    if (activeTeam === 1) {
      setActiveTeam(2)
    } else {
      setMatchData({
        ...matchData,
        team1Name: team1,
        team2Name: team2,
        team1Players,
        team2Players,
      })
      setScreen('toss')
    }
  }

  return (
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-5 flex items-center gap-3">
        <button
          onClick={() => activeTeam === 1 ? setScreen('matchSetup') : setActiveTeam(1)}
          className="text-chalk text-xl"
        >←</button>
        <span className="text-chalk text-lg font-display tracking-tight">
          {activeTeam === 1 ? 'TEAM 1 PLAYERS' : 'TEAM 2 PLAYERS'}
        </span>
      </div>

      <div className="p-5">
        <div>
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">
            {activeTeam === 1 ? 'Team 1 Name' : 'Team 2 Name'}
          </label>
          <input
            value={activeTeam === 1 ? team1 : team2}
            onChange={(e) => activeTeam === 1 ? setTeam1(e.target.value) : setTeam2(e.target.value)}
            placeholder={activeTeam === 1 ? 'e.g. Red Lions' : 'e.g. Blue Tigers'}
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 mb-4 text-sm focus:outline-none focus:border-brass"
          />
        </div>

        <p className="text-slate/60 text-xs font-mono uppercase tracking-wide mb-3">Player names</p>

        <div className="flex flex-col gap-3">
          {Array(playerCount).fill('').map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-brass font-display text-xs w-6">{i + 1}</span>
              <input
                value={activeTeam === 1 ? team1Players[i] : team2Players[i]}
                onChange={(e) => updatePlayer(activeTeam, i, e.target.value)}
                placeholder={`Player ${i + 1}`}
                className="flex-1 bg-white border-2 border-slate/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-brass text-pitch py-4 rounded-xl font-display text-sm tracking-wide border-2 border-pitch mt-6"
          style={{ boxShadow: '4px 4px 0 0 #0F1B12' }}
          onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onMouseUp={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
          onTouchStart={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onTouchEnd={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
        >
          {activeTeam === 1 ? 'NEXT → TEAM 2' : 'NEXT → TOSS'}
        </button>
      </div>
    </div>
  )
}

export default PlayerEntry