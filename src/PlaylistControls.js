import { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const PlaylistControls = (props) => { // add playlit, remove playlist, view playlist
    const [currentInput, setCurrentInput] = useState("")
    
    const handleClick = () => {
      fetch(`https://www.googleapis.com/youtube/v3/playlists?id=${currentInput}&key=${props.apiKey}&part=id,snippet&fields=items(id,snippet(title,channelId,channelTitle))`)
      .then(res => res.json())
      .then(json => {
        let newArr = [...props.playlists, [json.items[0], false]]
        props.setPlaylists(newArr)
        setCurrentInput("")
      })
    }
    
    const handleListClick = (e) => {
      let idxToToggle = props.playlists.findIndex(x => x[0].id === e.target.id)
      let newArr = [...props.playlists]
      newArr[idxToToggle][1] = !newArr[idxToToggle][1]
      props.setPlaylists(newArr)
    }
    
    const handleRemove = (e) => {
      let idxToRemove = props.playlists.findIndex(x => x[0].id === e.target.parentNode.id)
      let newArr = [...props.playlists]
      newArr.splice(idxToRemove, 1)
      props.setPlaylists(newArr)
    }
  
    return (
      <div>
        <div className='playlist-controls-wrapper'>
          <input className="playlist-input" type="text" placeholder='playlist ID here' onChange={e => setCurrentInput(e.target.value)} value={currentInput} />
          <button onClick={handleClick}>Add</button>
        </div>
        <ul className='playlist-list'>
          {props.playlists.map((item, idx) => {
            return(
              <li key={item[0].id} id={item[0].id} className={`playlist-list-li ${item[1] ? "playing" : null}`} onClick={handleListClick}>
                <span>{item[0].snippet.title}</span>
                <button onClick={handleRemove}><i className='fa fa-trash' /></button>
                </li>
            )
          })}
        </ul>
      </div>
  )
  }
export default PlaylistControls