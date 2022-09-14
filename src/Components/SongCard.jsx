import React, {useState} from 'react'


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
      onClick={toggleSelected}
    >
      <div className='img-container'>
        <img src={img} alt="" />
      </div>
      <div className='song-artist-container'>
        <div className='song-artist-subcontainer'>
          <h1 className='song-title'>{title}</h1>
          <h3 className='song-artist'>{artist}</h3>
        </div>
      </div>
      <div className='duration-container'>
        <h3>{timeFormat(length)}</h3>
      </div>
      <div className='plus-minus-container'>
        {isSelected && <div className='minus-button'>-</div>}
        {!isSelected && <div className='plus-button'>+</div>}
      </div>
    </div>
  )
}

export default SongCard