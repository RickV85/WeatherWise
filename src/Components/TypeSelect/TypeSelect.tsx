import { TypeSelectProps } from "../../Interfaces/interfaces";
import "./TypeSelect.css";

const TypeSelect: React.FC<TypeSelectProps> = ({
  currentGPSCoords,
  setSelectedLocType,
}) => {
  return (
    <div className="type-select-div">
      <h3>Select location type:</h3>
      <select
        name="typeSelect"
        className="type-select"
        onChange={(e) => {
          setSelectedLocType(e.target.value);
        }}
      >
        <option
          value={`${currentGPSCoords?.latitude}, ${currentGPSCoords?.longitude}`}
        >
          Current Location
        </option>
        <option value="Climbing">Climbing</option>
        <option value="Mountain Biking">Mountain Biking</option>
        <option value="Snowboarding">Snowboarding</option>
        <option value="Other Favorites">Other Favorites</option>
      </select>
    </div>
  );
};

export default TypeSelect;
