import { useEffect, useState } from 'react'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import './App.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const SATELLITES = ['SAT-1', 'SAT-2', 'SAT-3']

function App() {
  const [satellite, setSatellite] = useState('SAT-1')
  const [readings, setReadings] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/telemetry/${satellite}/`)
      .then((res) => res.json())
      .then((data) => {
        setReadings(data.readings)
        setError('')
      })
      .catch(() => setError('Could not load telemetry'))
  }, [satellite])

  const latest = readings[readings.length - 1]

  const chartData = {
    labels: readings.map((r) => r.timestamp.slice(11, 16)),
    datasets: [{
      label: 'Temperature (°C)',
      data: readings.map((r) => r.temperature),
      borderColor: '#2563eb',
      tension: 0.3,
    }],
  }

  return (
    <div className="app">
      <h1>Satellite Telemetry Dashboard</h1>

      <select value={satellite} onChange={(e) => setSatellite(e.target.value)}>
        {SATELLITES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      {error && <p className="error">{error}</p>}

      {latest && (
        <div className="cards">
          <div className="card"><h2>Battery</h2><p>{latest.battery}%</p></div>
          <div className="card"><h2>Temperature</h2><p>{latest.temperature} °C</p></div>
        </div>
      )}

      <Line data={chartData} />
    </div>
  )
}

export default App