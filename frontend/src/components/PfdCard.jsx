
export default function PfdCard({children, style}) {

    return(
        <div className={`absolute py-1.5 w-18 text-sm flex flex-col items-center rounded-sm shadow-sm ${style}`}>
            {children}
        </div>
    )
}