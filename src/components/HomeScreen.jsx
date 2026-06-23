function HomeScreen({ setScreen }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 px-4 py-4 flex items-center justify-between">
        <span className="text-white text-lg font-bold">Cricket Score Maker</span>
        <span className="text-white text-xl">🔔</span>
      </div>

      <div className="p-6 flex flex-col gap-4 mt-4">
        <button
          onClick={() => setScreen('matchSetup')}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg"
        >
          + NEW MATCH
        </button>

        <button
          onClick={() => setScreen('myMatches')}
          className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold text-lg"
        >
          MY MATCHES
        </button>

        <button
          className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold text-lg"
        >
          TOURNAMENTS
        </button>

        <button
          className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold text-lg"
        >
          TEAMS
        </button>

        <button
          className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold text-lg"
        >
          SETTINGS
        </button>
      </div>
    </div>
  )
}

export default HomeScreen