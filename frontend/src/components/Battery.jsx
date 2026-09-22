import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull, faBatteryThreeQuarters, faBatteryHalf, faBatteryQuarter, faBatteryEmpty, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Battery({battery_remaining}) {
    
    const battery = parseInt(battery_remaining)
    let battery_status = ''
    let styling = ''

    switch(true) {
        case battery > 75:
            battery_status = faBatteryFull
            styling = 'text-green-600 text-xl'
            break
        case battery > 50:
            battery_status = faBatteryThreeQuarters
            styling = 'text-green-600 text-xl'
            break
        case battery > 25:
            battery_status = faBatteryHalf
            styling = 'text-orange-600 text-xl'
            break
        case battery > 0:
            battery_status = faBatteryQuarter
            styling = 'text-red-600 text-xl'
            break
        case battery == 0:
            battery_status = faBatteryEmpty
            styling = 'text-red-600 text-xl'
            break
        default:
            battery_status = null
    }

    return(
        <div className='flex items-center gap-1'>
            {
                battery_status ? <FontAwesomeIcon icon={battery_status} className={styling}/>
                : <FontAwesomeIcon icon={faCircleExclamation} className='text-orange-600'/>
            }
            {battery_remaining && <p>{battery_remaining}%</p>}
        </div>
    )
}