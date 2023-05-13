import { Coords } from '../../Interfaces/AppInt';
import './LocationSelect.css'

interface Props {
  currentGPSCoords?: Coords;
  setSelectedLocCoords: (arg1: string) => void;
}

export default function LocationSelect({currentGPSCoords, setSelectedLocCoords}: Props) {

  return (
    <div className='location-div'>
      <h3>Select location:</h3>
      <select className='location-select' onChange={(e) => setSelectedLocCoords(e.target.value)}>
        <option value={`${currentGPSCoords?.latitude}, ${currentGPSCoords?.longitude}`}>Current Location</option>
        <option value={`40.00448179512719,-105.35580040554191`}>Lower BoCan</option>
        <option value={`40.00593496131527,-105.40944467300872`}>Middle BoCan</option>
        <option value={`39.977033107953744,-105.45843127551137`}>Upper BoCan</option>
        <option value={`40.002601,-105.297147`}>Flagstaff</option>
        <option value={`39.98831961133335,-105.29584913855683`}>North Flatirons</option>
        <option value={`39.975220034304584,-105.28993821568915`}>Middle Flatirons</option>
        <option value={`39.95465211561836,-105.28848226770084`} >South Flatirons</option>
        <option value={`39.933209521423514,-105.28935940451142`}>Eldorado Canyon</option>
        <option value={`39.73754560925745,-105.31547452836261`}>Lower CCC</option>
        <option value={`39.74535727604811,-105.4051450280658`}>Upper CCC</option>
        <option value={`39.81203821942002,-105.50553715534731`}>Maryland Mountain</option>
      </select>
    </div>
  )
}