import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-rotatedmarker"
import { useEffect, useRef } from "react"

const droneIcon = new L.Icon({
    iconUrl: "/MAV_ICON.png",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
})

export default function Map({telemetry}) {
    const markerRef = useRef(null)
    
    const currentHeading = useRef(0)
    const targetHeading = useRef(0)
    const animationFrame = useRef(null)

    useEffect(() => {
        if (telemetry?.heading == null) return

        targetHeading.current = telemetry.heading

        const animate = () => {
            let difference = targetHeading.current - currentHeading.current

            // take shortest rotation path
            if (difference > 180) difference -= 360
            if (difference < -180) difference += 360

            currentHeading.current += difference * 0.15

            // Normalize
            currentHeading.current = (currentHeading.current + 360) % 360

            if(markerRef.current) {
                markerRef.current.setRotationAngle(
                    currentHeading.current
                )
            }

            if(Math.abs(difference) > 0.05) {
                animationFrame.current = requestAnimationFrame(animate)
            }
        }

        cancelAnimationFrame(animationFrame.current)
        animate()

        return () => {
            cancelAnimationFrame(animationFrame.current)
        }
    }, [telemetry?.heading])
    
    return (
        <MapContainer
            center={[telemetry?.latitude, telemetry?.longitude]}
            zoom={16}
            style={{ height: "500px", width: "100%", borderRadius: '12px', border:'2px solid #ccc', zIndex: '1' }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker ref={markerRef} position={[telemetry?.latitude, telemetry?.longitude]} icon={droneIcon} rotationOrigin="center center">
                <Popup>MAV Location</Popup>
            </Marker>
        </MapContainer>
    )
}