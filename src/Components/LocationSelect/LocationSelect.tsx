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
      <select onChange={(e) => setSelectedLocCoords(e.target.value)}>
        <option value={`${currentGPSCoords?.latitude}, ${currentGPSCoords?.longitude}`}>Current Location</option>
        <option value={`40.00448179512719,-105.35580040554191`}>Lower BoCan</option>
        <option value={`40.00593496131527,-105.40944467300872`}>Middle BoCan</option>
        <option value={`39.977033107953744,-105.45843127551137`}>Upper BoCan</option>
      </select>
    </div>
  )
}