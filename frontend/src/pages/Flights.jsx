import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import Error from "../components/Error";
import Loading from "../components/Loading";
import FlightCard from "../components/FlightCard";
import Header from "../components/Header";

export default function Flights() {
    const {vehicleId} = useParams()

    const [flights, setFlights] = useState([])

    const {request, loading, error} = useApi()

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const result = await request(`/vehicles/${vehicleId}/flights`)
                setFlights(result.data)
            } catch(error) {
                console.error(error)
            }
        }

        fetchFlights()
    }, [vehicleId])

    if (loading) return <Loading />
    if (error) return <Error message={error}/>

    return (
        <div>
            <Header />
            <div className="w-full md:w-[90%] mx-auto">
                <h1 className="w-fit mx-auto text-lg py-3">Flights</h1>
                <div className="flex flex-col gap-2">
                {
                    flights.length == 0 
                    ? <Error message={"No flights found"} />
                    : flights.map((flight) => (
                        <FlightCard key={flight.id} flight={flight} vehicleId={vehicleId}/>
                    ))
                }
                </div>
            </div>
        </div>
    );
}