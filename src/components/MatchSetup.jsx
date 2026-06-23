function MatchSetup({ setScreen, matchData, setMatchData }) {
  const handleChange = (e) => {
    setMatchData({ ...matchData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 px-4 py-4 flex items-center gap-3">
        <button onClick={() => setScreen('home')} className="text-white text-xl">←</button>
        <span className="text-white text-lg font-bold">New Match</span>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div>
          <label className="text-gray-600 text-sm font-medium">Match Name</label>
          <input
            name="matchName"
            value={matchData.matchName || ''}
            onChange={handleChange}
            placeholder="Enter match name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium">Tournament (Optional)</label>
          <input
            name="tournament"
            value={matchData.tournament || ''}
            onChange={handleChange}
            placeholder="Enter tournament name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium">Venue</label>
          <input
            name="venue"
            value={matchData.venue || ''}
            onChange={handleChange}
            placeholder="Enter venue"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium">Date & Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            value={matchData.dateTime || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium">Match Type</label>
          <select
            name="matchType"
            value={matchData.matchType || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Select match type</option>
            <option value="T20">T20</option>
            <option value="ODI">ODI</option>
            <option value="Test">Test</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium">Total Overs</label>
          <input
            type="number"
            name="overs"
            value={matchData.overs || ''}
            onChange={handleChange}
            placeholder="Enter number of overs"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-600 text-sm font-medium">Players per Side</label>
          <input
            type="number"
            name="players"
            value={matchData.players || ''}
            onChange={handleChange}
            placeholder="Enter number of players"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-1 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => setScreen('playerEntry')}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg mt-2"
        >
          CREATE MATCH
        </button>
      </div>
    </div>
  )
}

export default MatchSetup