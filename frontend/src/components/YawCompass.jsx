
export default function YawCompass({telemetry}) {
        const yaw = Math.round(telemetry.yaw)

    const normalizeHeading = (value) => {
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
        <div className="px-1.5 pb-0.5 flex items-start justify-between relative bg-slate-100 rounded-sm outline-2 outline-slate-900">
            <div className="absolute top-0 left-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-slate-900 -translate-x-1/2"></div>
            <div className="w-5 flex flex-col items-center justify-center">
                <div className="w-0.5 h-4 bg-slate-900"></div>
                <p>{normalizeHeading(yaw - 3)}</p>
            </div>
            <div className="w-0.5 h-2.5 bg-slate-400"></div>
            <div className="w-5 flex flex-col items-center justify-center">
                <div className="w-0.5 h-4 bg-slate-900"></div>
                <p>{normalizeHeading(yaw - 2)}</p>
            </div>
            <div className="w-0.5 h-2.5 bg-slate-400"></div>
            <div className="w-5 flex flex-col items-center justify-center">
                <div className="w-0.5 h-4 bg-slate-900"></div>
                <p>{normalizeHeading(yaw - 1)}</p>
            </div>
            <div className="w-0.5 h-2.5 bg-slate-400"></div>
            <div className="w-5 flex flex-col items-center justify-center">
                <div className="w-0.5 h-4 bg-slate-900"></div>
                <p>{normalizeHeading(yaw)}</p>
            </div>
            <div className="w-0.5 h-2.5 bg-slate-400"></div>
            <div className="w-5 flex flex-col items-center justify-center">
                <div className="w-0.5 h-4 bg-slate-900"></div>
                <p>{normalizeHeading(yaw + 1)}</p>
            </div>
            <div className="w-0.5 h-2.5 bg-slate-400"></div>
            <div className="w-5 flex flex-col items-center justify-center">
                <div className="w-0.5 h-4 bg-slate-900"></div>
                <p>{normalizeHeading(yaw + 2)}</p>
            </div>
            <div className="w-0.5 h-2.5 bg-slate-400"></div>
            <div className="w-5 flex flex-col items-center justify-center">
                <div className="w-0.5 h-4 bg-slate-900"></div>
                <p>{normalizeHeading(yaw + 3)}</p>
            </div>
        </div>
    )
    
}