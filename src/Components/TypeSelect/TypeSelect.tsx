import { TypeSelectProps } from '../../Interfaces/interfaces';
import './TypeSelect.css'

const TypeSelect: React.FC<TypeSelectProps> = ({ currentGPSCoords }) => {
  return (
    <select name="typeSelect" >
        <option value={`${currentGPSCoords?.latitude}, ${currentGPSCoords?.longitude}`}>Current Location</option>
      <option value='Climbing'>Climbing</option>
      <option value='Mountain Biking'>Mountain Biking</option>
      <option value='Snowboarding'>Snowboarding</option>
      <option value='Other Favorites'>Other Favorites</option>
    </select>
  )
}

export default TypeSelect;