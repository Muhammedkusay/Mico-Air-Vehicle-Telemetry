
export default function ConnectionState({websocket, mavlink}) {

    return(
        <>
            <div className={`z-15 group relative w-fit px-2 pt-1 pb-1.5 flex items-center justify-center rounded-md gap-2 cursor-default ${websocket && mavlink ? 'text-green-600 bg-green-100 border border-green-500' : 'text-red-700 bg-red-100 border border-red-700'}`}>
                <p>{websocket && mavlink ? "Connected" : "Disconnected"}</p>
                <div className={`w-2 h-2 rounded-full ${websocket && mavlink ? 'bg-green-600 animate-pulse' : 'bg-red-700'}`}></div>
                
                {/* info card */}
                <div className="w-fit whitespace-nowrap hidden group-hover:block px-2 py-0.5 absolute top-10 left-1/2 -translate-x-1/2 text-sm text-black bg-slate-50 border border-slate-300 rounded-md shadow-sm">
                    <p>{websocket ? "websocket connected" : "websocket disconnected"}</p>
                    <p>{mavlink ? "mavlink connected" : "mavlink disconnected"}</p>
                </div>
            </div>
        </>
    )
}