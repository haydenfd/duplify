import React, {useState} from 'react'
import '../App.css'

const timeFormat = (ms) => {
  var min = Math.floor(ms / 60000);
  var sec = ((ms % 60000) / 1000).toFixed(0);
  return min + ":" + (sec < 10 ? '0' : '') + sec;
}

const SongCard = ({ num, img, title, artist, length }) => {

  const [isSelected, setIsSelected] = useState(true)

  const toggleSelected = () => { setIsSelected(!isSelected) }

  return (
    <div
      className={isSelected ?
        'selected-container songcard-container' : 'not-selected-container songcard-container'}
      onClick={(e) => {
        toggleSelected()
       console.log(e) 
      }}
    >
      <div className='left-float'>
        <div className='img-container'>
          <img src={img} alt="" />
        </div>
        <div className='song-artist-container'>
          <div className='song-artist-subcontainer'>
            <span className='song-title'>{title}</span>
            <span className='song-artist'>{artist}</span>
          </div>
        </div>
      </div>
      <div className='right-float '>
        <div className='duration-container'>
          <h3>{timeFormat(length)}</h3>
        </div>
        <div className='plus-minus-container'>
          {isSelected && <div className='minus-button'>-</div>}
          {!isSelected && <div className='plus-button'>+</div>}
        </div>
      </div>
    </div>
  )
}

export default SongCard