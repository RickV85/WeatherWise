import './LocationSelect.css'

export default function LocationSelect() {

  return (
    <div className='location-div'>
      <h3>Select location:</h3>
      <select>
        <option>Lower BoCan</option>
        <option>Middle BoCan</option>
        <option>Upper BoCan</option>
      </select>
    </div>
  )
}