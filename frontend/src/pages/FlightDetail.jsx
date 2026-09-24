import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useApi } from "../hooks/useApi";
import Loading from "../components/Loading";
import Error from "../components/Error";
import FlightMap from "../components/FlightMap";
import AltitudeChart from "../components/AltitudeChart";
import Header from "../components/Header";
import SpeedChart from "../components/SpeedChart";
import BatteryChart from "../components/BatteryChart";

export default function FlightDetails() {
    const { vehicleId, flightId } = useParams();

    const [telemetry, setTelemetry] = useState([]);

    const { request, loading, error } = useApi();

    useEffect(() => {
        const fetchTelemetry = async () => {
            try {
                const result = await request(
                    `/vehicles/${vehicleId}/flights/${flightId}/telemetry`
                );

                setTelemetry(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTelemetry();
    }, [vehicleId, flightId]);

    if (loading) return <Loading />
    if (error) return <Error message={error} />

    return (
        <>{
            telemetry.length == 0
            ?<Error message={"No telemetry found."}/>
            :<div className="mb-6">
                <Header />
                {/* info card */}
                <div className="mb-4 pb-1.5 pt-1 px-2.5 bg-slate-700 text-white text-center">
                    <div className="w-full md:w-[90%] mx-auto flex items-center justify-between">
                        <p>Vehicle: {vehicleId} / Flight: {flightId}</p>
                        <div>{new Date(telemetry[telemetry.length - 1].created_at).toLocaleString()} - {new Date(telemetry[0].created_at).toLocaleString()}</div>
                    </div>
                </div>
                {/* map & charts */}
                <div className="w-full md:w-[90%] md:mx-auto">
                    {/* map */}
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="w-full m-4 md:m-0 shadow-sm rounded-xl border border-slate-300">
                            <FlightMap telemetry={telemetry}/>
                        </div>
                    </div>
                    {/* charts */}
                    <div className="mt-4 flex flex-col md:flex-row items-start justify-between gap-4">
                        {/* altitude chart */}
                        <div className="w-full md:w-1/2 m-4 md:m-0">
                            <AltitudeChart telemetry={telemetry}/>
                        </div>
                        {/* ground speed chart */}
                        <div className="w-full md:w-1/2 m-4 md:m-0">
                            <SpeedChart telemetry={telemetry}/>
                        </div>
                        {/* battery remaining chart */}
                        <div className="w-full md:w-1/2 m-4 md:m-0">
                            <BatteryChart telemetry={telemetry}/>
                        </div>
                    </div>
                </div>
            </div>
        }</>
    );
}