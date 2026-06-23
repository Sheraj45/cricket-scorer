import { useState } from 'react'

function TeamsScreen({ setScreen, teams, setTeams }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [teamName, setTeamName] = useState('')
  const [playerCount, setPlayerCount] = useState(11)
  const [players, setPlayers] = useState(Array(11).fill(''))

  const openNewForm = () => {
    setEditingId(null)
    setTeamName('')
    setPlayerCount(11)
    setPlayers(Array(11).fill(''))
    setShowForm(true)
  }

  const openEditForm = (team) => {
    setEditingId(team.id)
    setTeamName(team.name)
    setPlayerCount(team.players.length)
    setPlayers(team.players)
    setShowForm(true)
  }

  const updatePlayerCount = (count) => {
    const n = parseInt(count) || 1
    setPlayerCount(n)
    const newPlayers = Array(n).fill('')
    players.forEach((p, i) => { if (i < n) newPlayers[i] = p })
    setPlayers(newPlayers)
  }

  const updatePlayer = (index, value) => {
    const updated = [...players]
    updated[index] = value
    setPlayers(updated)
  }

  const saveTeam = () => {
    if (!teamName.trim()) {
      alert('Please enter a team name')
      return
    }
    const cleanedPlayers = players.map((p, i) => p.trim() || `Player ${i + 1}`)

    if (editingId) {
      setTeams(teams.map(t => t.id === editingId ? { ...t, name: teamName, players: cleanedPlayers } : t))
    } else {
      setTeams([...teams, { id: Date.now(), name: teamName, players: cleanedPlayers }])
    }
    setShowForm(false)
  }

  const deleteTeam = (id) => {
    if (confirm('Delete this team?')) {
      setTeams(teams.filter(t => t.id !== id))
    }
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-chalk font-body">
        <div className="bg-pitch px-5 py-5 flex items-center gap-3">
          <button onClick={() => setShowForm(false)} className="text-chalk text-xl">←</button>
          <span className="text-chalk text-lg font-display tracking-tight">
            {editingId ? 'EDIT TEAM' : 'NEW TEAM'}
          </span>
        </div>

        <div className="p-5">
          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Team Name</label>
          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. Red Lions"
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 mb-4 text-sm focus:outline-none focus:border-brass"
          />

          <label className="text-slate/60 text-xs font-mono uppercase tracking-wide">Number of Players</label>
          <input
            type="number"
            value={playerCount}
            onChange={(e) => updatePlayerCount(e.target.value)}
            min="2"
            max="15"
            className="w-full bg-white border-2 border-slate/15 rounded-lg px-4 py-3 mt-1 mb-4 text-sm focus:outline-none focus:border-brass"
          />

          <p className="text-slate/60 text-xs font-mono uppercase tracking-wide mb-3">Player Names</p>
          <div className="flex flex-col gap-3">
            {players.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-brass font-display text-xs w-6">{i + 1}</span>
                <input
                  value={p}
                  onChange={(e) => updatePlayer(i, e.target.value)}
                  placeholder={`Player ${i + 1}`}
                  className="flex-1 bg-white border-2 border-slate/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brass"
                />
              </div>
            ))}
          </div>

          <button
            onClick={saveTeam}
            className="w-full bg-brass text-pitch py-4 rounded-xl font-display text-sm tracking-wide border-2 border-pitch mt-6"
            style={{ boxShadow: '4px 4px 0 0 #0F1B12' }}
            onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
            onMouseUp={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
            onTouchStart={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
            onTouchEnd={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
          >
            SAVE TEAM
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-chalk font-body">
      <div className="bg-pitch px-5 py-5 flex items-center gap-3">
        <button onClick={() => setScreen('home')} className="text-chalk text-xl">←</button>
        <span className="text-chalk text-lg font-display tracking-tight">TEAMS</span>
      </div>

      <div className="p-5">
        <button
          onClick={openNewForm}
          className="w-full bg-brass text-pitch py-4 rounded-xl font-display text-sm tracking-wide border-2 border-pitch mb-4"
          style={{ boxShadow: '4px 4px 0 0 #0F1B12' }}
          onMouseDown={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onMouseUp={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
          onTouchStart={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(4px, 4px)' }}
          onTouchEnd={(e) => { e.currentTarget.style.boxShadow = '4px 4px 0 0 #0F1B12'; e.currentTarget.style.transform = 'translate(0, 0)' }}
        >
          + ADD TEAM
        </button>

        {teams.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏏</div>
            <p className="text-slate/60">No teams saved yet.</p>
            <p className="text-slate/40 text-sm font-mono">Add a team to reuse it in matches!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {teams.map(team => (
              <div key={team.id} className="bg-white border-2 border-slate/15 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-display text-sm text-slate">{team.name}</p>
                  <span className="text-[10px] font-mono uppercase text-slate/40">
                    {team.players.length} players
                  </span>
                </div>
                <p className="text-xs text-slate/50 mb-3">
                  {team.players.slice(0, 4).join(', ')}{team.players.length > 4 ? '...' : ''}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(team)}
                    className="flex-1 bg-chalk text-slate py-2 rounded-lg text-xs font-mono uppercase border border-slate/15"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTeam(team.id)}
                    className="flex-1 bg-ball/10 text-ball py-2 rounded-lg text-xs font-mono uppercase border border-ball/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamsScreen