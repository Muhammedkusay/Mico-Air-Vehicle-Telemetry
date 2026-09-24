import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-rotatedmarker"
import { useEffect, useRef } from "react"

export default function Map({telemetry}) {
    const droneIcon = new L.Icon({
        iconUrl: telemetry.system_id == 1 ? "/COPTER_ICON.png" : "/PLANE_ICON.png",
        iconSize: [45, 45],
        iconAnchor: [25, 25],
    })
    
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
            center={[telemetry?.latitude || 33.5143656, telemetry?.longitude || 36.2736165]}
            zoom={16}
            style={{ height: "500px", width: "100%", borderRadius: '12px', border:'2px solid #ccc', zIndex: '1' }}
        >
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri"
            />

            <Marker ref={markerRef} position={[telemetry?.latitude || 33.5143656, telemetry?.longitude || 36.2736165]} icon={droneIcon} rotationOrigin="center center">
                <Popup>MAV Location</Popup>
            </Marker>
        </MapContainer>
    )
}