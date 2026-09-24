import { faEarthAfrica } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Header() {

    return(
        <header className="w-full border-b border-b-slate-300 py-2 px-8 md:px-0">
            <div className="w-full md:w-[90%] mx-auto flex items-center justify-between ">                
                <Link to={'/'} className="flex items-center italic font-semibold text-slate-700">
                    <FontAwesomeIcon icon={faEarthAfrica} className="text-2xl"/>
                    <p>MavLink</p>
                </Link>
                <nav className="flex items-center gap-3">
                    <Link to={'/dashboard'} className="hover:underline">Dashboard</Link>
                    <Link to={'/vehicles/1/flights'} className="hover:underline">Flights</Link>
                </nav>
            </div>
        </header>
    )
}