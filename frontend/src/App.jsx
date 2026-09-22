import { useState, useEffect } from 'react'
import useTelemetry from './hooks/useTelemetry'
import Battery from './components/Battery'
import Pfd from './components/Pfd'
import Map from './components/Map'
import ConnectionState from './components/ConnectionState'

function App() {
  const {telemetry, connected} = useTelemetry()

  // dummy data
  // const [connected, setConnected] = useState(true)
  // const [telemetry, setTelemetry] = useState({
  //   "connection": true,
  //   "mode": "STABILIZE",
  //   "armed": true,
  //   "altitude": 0,
  //   "pitch": 0,
  //   "roll": 0,
  //   "yaw": 0,
  //   "heading": 0,
  //   "latitude": 33.5139,
  //   "longitude": 36.2766,
  // })

  if (!telemetry) {
    return <div className='w-fit mx-auto mt-12'><ConnectionState websocket={connected} mavlink={telemetry?.connection} /></div>
  }

  const checkConnection = () => {
    return telemetry.connection && connected
  }

  return(
    <main className='w-[90%] mx-auto'>
      <header className='p-3 my-4 flex flex-row-reverse items-center justify-between bg-slate-50 border border-slate-300 rounded-2xl'>
        <ConnectionState websocket={connected} mavlink={telemetry.connection} />
        <h1 className='text-2xl font-semibold text-slate-700'>MAVLink Telemetry</h1>
        <Battery battery_remaining={telemetry.battery_remaining}/>
      </header>
      {checkConnection() && <div>
        <div className="flex flex-col lg:flex-row items-center justify-around gap-12 mx-auto">
          <Map telemetry={telemetry}/>
          <Pfd telemetry={telemetry}/>
        </div>
      </div>}
    </main>
  )
}

export default App
