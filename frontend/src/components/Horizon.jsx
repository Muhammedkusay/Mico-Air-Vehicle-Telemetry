import { useEffect, useRef } from "react"

export default function Horizon({telemetry}) {
    const horizonRef = useRef(null)

    const currentRoll = useRef(0)
    const currentPitch = useRef(0)
    const targetRoll = useRef(0)
    const targetPitch = useRef(0)

    useEffect(() => {
        targetRoll.current = parseInt(telemetry.roll) || 0
        targetPitch.current = parseInt(telemetry.pitch) || 0
    }, [telemetry.pitch, telemetry.roll])

    useEffect(() => {
        let animationFrame

        const animate = () => {
            currentRoll.current += (targetRoll.current - currentRoll.current) * 0.15
            currentPitch.current += (targetPitch.current - currentPitch.current) * 0.15

            const pitchScale = 6
            if(horizonRef.current) {
                const pitchOffset = currentPitch.current * pitchScale
                const rollAngle = -currentRoll.current

                horizonRef.current.style.transform = `rotate(${rollAngle}deg) translateY(${pitchOffset}px)`
            }

            animationFrame = requestAnimationFrame(animate)
        }
        animate()

        return () => cancelAnimationFrame(animationFrame)
    }, [])


    return(
        <div className="relative m-6 size-[260px] bg-transparent outline-6 outline-slate-800 rounded-full flex items-center overflow-hidden">
            
            {/* crosshair */}
            <div className="z-10 absolute top-2 left-1/2 -translate-x-1/2 w-1 h-27 bg-[#00ff00] border"></div>
            <div className="z-10 absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-27 bg-[#00ff00] border"></div>
            <div className="z-10 absolute top-1/2 left-22 -translate-y-1/2 w-6 h-1 bg-[#00ff00] border"></div>
            <div className="z-10 absolute top-1/2 right-22 -translate-y-1/2 w-6 h-1 bg-[#00ff00] border"></div>
            <div className="z-10 absolute w-[240px] flex items-center justify-between mx-2.5">
                <div className="relative">
                    <div className="w-16 h-2 bg-black"></div>
                    <div className="w-2 h-4 absolute right-0 bg-black"></div>
                </div>
                <div className="w-2 h-2 bg-yellow-300 border"></div>
                <div className="relative">
                    <div className="w-16 h-2 bg-black"></div>
                    <div className="w-2 h-4 absolute bg-black"></div>
                </div>
            </div>

            {/* horizon */}
            <div className="w-[1200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div ref={horizonRef} className="w-full text-white text-xl font-semibold">
                    {/* sky */}
                    <div className="h-[720px] bg-sky-500">
                        <div className="h-[180px]"></div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>90</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>90</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>80</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>80</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>70</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>70</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>60</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>60</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>50</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>50</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>40</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>40</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>30</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>30</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>20</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>20</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-start justify-center gap-2">
                            <p>10</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>10</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                    </div>
                    {/* ground */}
                    <div className="h-[720px] bg-amber-700">
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>10</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>10</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>20</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>20</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>30</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>30</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>40</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>40</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>50</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>50</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>60</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>60</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>70</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>70</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>80</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>80</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                        <div className="relative h-[60px] flex items-end justify-center gap-2">
                            <p>90</p>
                            <div className="w-[80px] h-[3px] bg-white"></div>
                            <p>90</p>
                            <div className="h-[1px] w-[40px] bg-white mx-auto absolute top-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}