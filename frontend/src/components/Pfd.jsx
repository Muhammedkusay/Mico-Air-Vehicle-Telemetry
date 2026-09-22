import Compass from "./Compass";
import Horizon from "./Horizon";
import PfdCard from "./PfdCard";
import YawCompass from "./YawCompass";

export default function Pfd({telemetry}) {

    return(
        <div className="w-fit pb-4 px-16 relative">
            <Compass telemetry={telemetry}/>
            <Horizon telemetry={telemetry}/>
            <YawCompass telemetry={telemetry}/>
            {/* arm */}
            <PfdCard style={telemetry.armed ? "bg-emerald-600 text-white top-1/2 left-0 py-4" : "bg-red-700 text-white top-1/2 left-0 py-4"}>
                <p>{telemetry.armed ? "ARMED" : "DISARMED"}</p>
            </PfdCard>
            {/* mode */}
            <PfdCard style={"top-2/6 right-0 bg-slate-100 outline outline-slate-300"}>
                <p className="font-semibold">Mode</p>
                <p>{telemetry.mode}</p>
            </PfdCard>
            {/* altitude */}
            <PfdCard style={"top-1/2 right-0 bg-slate-100 outline outline-slate-300"}>
                <p className="font-semibold">Alt</p>
                <p>{telemetry.altitude}m</p>
            </PfdCard>
            {/* pitch */}
            <PfdCard style={"top-2/3 left-0 bg-slate-100 outline outline-slate-300"}>
                <p className="font-semibold">Pitch</p>
                <p>{parseInt(Number(telemetry.pitch))}°</p>
            </PfdCard>
            {/* roll */}
            <PfdCard style={"top-2/3 right-0 bg-slate-100 outline outline-slate-300"}>
                <p className="font-semibold">Roll</p>
                <p>{parseInt(Number(telemetry.roll))}°</p>
            </PfdCard>
        </div>
    )
}