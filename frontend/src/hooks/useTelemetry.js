import { useEffect, useState } from "react";

function useTelemetry() {
    const [connected, setConnected] = useState(false)
    const [telemetry, setTelemetry] = useState(null)

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8765")

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setTelemetry(data)
        }

        socket.onopen = () => {
            console.log("WebSocket Connected")
            setConnected(true)
        }

        socket.onclose = () => {
            console.log("WebSocket Disconnected")
            setConnected(false)
        }

        return () => {
            socket.close()
        }
    }, [])

    return {telemetry, connected}
}

export default useTelemetry