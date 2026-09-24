import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"


export default function FlightMap({telemetry}) {

    const [path, setPath] = useState([])

    const redCircleIcon = L.divIcon({
        html: `<div style="
            width: 10px; 
            height: 10px; 
            background-color: blue; 
            border-radius: 50%; 
            border: 2px solid white; 
            box-shadow: 0 0 4px rgba(0,0,0,0.4);
        "></div>`,
        className: "custom-red-circle", 
        iconSize: 20,            
        iconAnchor: 0,          
        })

    useEffect(() => {
        if (!telemetry || !Array.isArray(telemetry)) return;

        const orderedTelemetry = [...telemetry].reverse()

        const uniquePath = [];
        let lastLat = orderedTelemetry[0].latitude
        let lastLng = orderedTelemetry[0].longitude

        uniquePath.push([lastLat, lastLng]);

        let minStepSize = 0.0001

        orderedTelemetry.slice(1).forEach(tel => {
            const latDiff = Math.abs(tel.latitude - lastLat)
            const lngDiff = Math.abs(tel.longitude - lastLng)

            if(latDiff >= minStepSize || lngDiff >= minStepSize) {
                lastLat = tel.latitude
                lastLng = tel.longitude
                uniquePath.push([tel.latitude, tel.longitude])
            }
        });

        setPath(uniquePath)
    }, [telemetry])
    
    const defaultCenter = [33.5143656, 36.2736165];
    const initialCenter = path.length > 0 ? [path[0][0], path[0][1]] : defaultCenter;

    return (
        <MapContainer
            center={initialCenter}
            zoom={16}
            style={{ height: "400px", width: "100%", borderRadius: '12px', zIndex: '1' }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                path.map((element, index) => 
                    (element[0] && element[1]) && (<Marker key={`${element[0]}-${element[1]}-${index}`} position={[element[0], element[1]]} icon={redCircleIcon}>
                        {index == 0 && <Popup>First Node</Popup>}
                        {index == path.length - 1 && <Popup>Last Node</Popup>}
                        {(index != 0 && index != path.length - 1) &&<Popup>MAV Path Node {index + 1}</Popup>}
                    </Marker>)
                )
            }

        </MapContainer>
    )
}