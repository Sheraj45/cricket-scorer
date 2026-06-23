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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => activeTeam === 1 ? setScreen('matchSetup') : setActiveTeam(1)}
          className="text-white text-xl"
        >←</button>
        <span className="text-white text-lg font-bold">
          {activeTeam === 1 ? 'Team 1 Players' : 'Team 2 Players'}
        </span>
      </div>

      <div className="p-6">
        <div>
          <label className="text-gray-600 text-sm font-medium">
            {activeTeam === 1 ? 'Team 1 Name' : 'Team 2 Name'}
          </label>
          <input
            value={activeTeam === 1 ? team1 : team2}
            onChange={(e) => activeTeam === 1 ? setTeam1(e.target.value) : setTeam2(e.target.value)}
            placeholder={activeTeam === 1 ? 'e.g. Red Lions' : 'e.g. Blue Tigers'}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 mb-4 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <p className="text-gray-500 text-sm mb-3">Enter player names:</p>

        <div className="flex flex-col gap-3">
          {Array(playerCount).fill('').map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-blue-600 font-bold w-6 text-sm">{i + 1}</span>
              <input
                value={activeTeam === 1 ? team1Players[i] : team2Players[i]}
                onChange={(e) => updatePlayer(activeTeam, i, e.target.value)}
                placeholder={`Player ${i + 1}`}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg mt-6"
        >
          {activeTeam === 1 ? 'NEXT → TEAM 2' : 'NEXT → TOSS'}
        </button>
      </div>
    </div>
  )
}

export default PlayerEntry