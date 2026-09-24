import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function VehicleCard({vehicle}) {

    return(
        <div className="m-1 md:m-0 p-2 flex items-center justify-between bg-slate-50 border border-slate-300 rounded-lg">
            <div className="flex items-center gap-3">
                <div className="size-10 flex items-center justify-center text-lg text-slate-700 bg-slate-100 border border-slate-300 rounded-lg">
                    {vehicle.system_id == 1 && <img src="./copter.png" alt="" className="w-6"/>}
                    {vehicle.system_id == 2 && <img src="./plane.jpg" alt="" className="w-6"/>}
                </div>
                <div>
                    <h2 className="font-semibold">{vehicle.name}<span className="pl-1 text-sm text-slate-500">vehicle #{vehicle.id}</span></h2>
                    <p className="text-sm text-slate-700">{new Date(vehicle.created_at).toLocaleString()}</p>
                </div>
            </div>
            <Link to={`/vehicles/${vehicle.id}/flights`} className="px-5 pt-2 pb-2.5 text-sm text-white bg-slate-800 hover:bg-slate-600 rounded-md">Flights</Link>
        </div>
    )
}