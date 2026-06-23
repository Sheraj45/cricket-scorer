import { useState, useEffect } from 'react'
import SettingsScreen from './components/SettingsScreen'
import SplashScreen from './components/SplashScreen'
import HomeScreen from './components/HomeScreen'
import MatchSetup from './components/MatchSetup'
import PlayerEntry from './components/PlayerEntry'
import TossScreen from './components/TossScreen'
import LiveScore from './components/LiveScore'
import InningsBreak from './components/InningsBreak'
import MatchSummary from './components/MatchSummary'
import MyMatches from './components/MyMatches'
import TeamsScreen from './components/TeamsScreen'

function App() {
  const [screen, setScreen] = useState('splash')
  const [matchData, setMatchData] = useState({ currentInnings: 0 })

  const [matchHistory, setMatchHistory] = useState(() => {
    const saved = localStorage.getItem('cricket_match_history')
    return saved ? JSON.parse(saved) : []
  })

  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('cricket_teams')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cricket_match_history', JSON.stringify(matchHistory))
  }, [matchHistory])

  useEffect(() => {
    localStorage.setItem('cricket_teams', JSON.stringify(teams))
  }, [teams])

  return (
    <div className="max-w-sm mx-auto min-h-screen bg-white">
      {screen === 'splash' && <SplashScreen setScreen={setScreen} />}
      {screen === 'home' && <HomeScreen setScreen={setScreen} />}
      {screen === 'matchSetup' && (
        <MatchSetup setScreen={setScreen} matchData={matchData} setMatchData={setMatchData} />
      )}
      {screen === 'playerEntry' && (
        <PlayerEntry
          setScreen={setScreen}
          matchData={matchData}
          setMatchData={setMatchData}
          teams={teams}
        />
      )}
      {screen === 'toss' && (
        <TossScreen setScreen={setScreen} matchData={matchData} setMatchData={setMatchData} />
      )}
      {screen === 'liveScore' && (
        <LiveScore setScreen={setScreen} matchData={matchData} setMatchData={setMatchData} />
      )}
      {screen === 'inningsBreak' && (
        <InningsBreak setScreen={setScreen} matchData={matchData} setMatchData={setMatchData} />
      )}
      {screen === 'matchSummary' && (
        <MatchSummary
          setScreen={setScreen}
          matchData={matchData}
          setMatchHistory={setMatchHistory}
        />
      )}
      {screen === 'myMatches' && (
        <MyMatches setScreen={setScreen} matchHistory={matchHistory} />
      )}
      {screen === 'teams' && (
        <TeamsScreen setScreen={setScreen} teams={teams} setTeams={setTeams} />
      )}
      {screen === 'settings' && (
  <SettingsScreen
    setScreen={setScreen}
    setMatchHistory={setMatchHistory}
    setTeams={setTeams}
  />
)}
    </div>
  )
}

export default App