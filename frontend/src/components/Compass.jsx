
export default function Compass({telemetry}) {
    
    const heading = Math.round(telemetry.heading) || 0

    const normalizeYaw = (value) => {
        let result = ((value % 360) + 360) % 360
        switch (result){
            case 0:
                return result = 'N'
            case 45:
                return result = 'NE'
            case 90:
                return result = 'E'
            case 135:
                return result = 'SE'
            case 180:
                return result = 'S'
            case 225:
                return result = 'SW'
            case 270:
                return result = 'W'
            case 315:
                return result = 'NW'
        }
        
        return result
    }

    return (
        <div className="relative w-4/5 h-9 mx-auto px-1.5">
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-0 w-0 border-x-[15px] border-x-transparent border-b-[15px] border-b-slate-800"></div>
            {/* yaw - 2 */}
            <div className="absolute top-[45px] rotate-[-45deg] w-5 flex flex-col items-center justify-center">
                <p>{normalizeYaw(heading - 2)}</p>
                <div className="w-0.5 h-3 bg-slate-800"></div>
            </div>
            <div className="absolute top-[55px] left-[45px] rotate-[-35deg] w-0.5 h-1.5 bg-slate-800"></div>
            {/* yaw - 1 */}
            <div className="absolute top-[15px] left-[55px] rotate-[-20deg] w-5 flex flex-col items-center justify-center">
                <p>{normalizeYaw(heading - 1)}</p>
                <div className="w-0.5 h-3 bg-slate-800"></div>
            </div>
            <div className="absolute top-[37px] left-[95px] rotate-[-15deg] w-0.5 h-1.5 bg-slate-800"></div>
            {/* yaw */}
            <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-5 flex flex-col items-center justify-center">
                <p>{normalizeYaw(heading)}</p>
                <div className="w-0.5 h-3 bg-slate-800"></div>
            </div>
            <div className="absolute top-[37px] right-[95px] rotate-[15deg] w-0.5 h-1.5 bg-slate-800"></div>
            {/* yaw + 1 */}
            <div className="absolute top-[15px] right-[55px] rotate-[20deg] w-5 flex flex-col items-center justify-center">
                <p>{normalizeYaw(heading + 1)}</p>
                <div className="w-0.5 h-3 bg-slate-800"></div>
            </div>
            <div className="absolute top-[55px] right-[45px] rotate-[35deg] w-0.5 h-1.5 bg-slate-800"></div>
            {/* yaw + 2 */}
            <div className="absolute top-[45px] right-0 rotate-[45deg] w-5 flex flex-col items-center justify-center">
                <p>{normalizeYaw(heading + 2)}</p>
                <div className="w-0.5 h-3 bg-slate-800"></div>
            </div>
        </div>
    )
}