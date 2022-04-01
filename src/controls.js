const Controls = (props) => { 
  
    // Fisher–Yates shuffle
    const handleShuffle = () => {
      console.log(props.currentVideo)
      let newArr = props.songs;
      for (let i = newArr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      if (props.currentVideo !== 0){
        props.setCurrentVideo(0)
      }else{
        props.setCurrentVideo(1)
      }
      props.setSongs(newArr)
    }
    const handleSwitch = () => {
      let newState = !props.viewPlaylistControls
      props.setViewPlaylistControls(newState)
    }
    return(
      <div className='controls-wrapper'>
        <div className="button-wrapper">
          <button className="prev-button" onClick={props.prevVideo}>prev</button>
          <button className="next-button" onClick={props.nextVideo}>next</button>
          <button classNmae="toggle-songs-button" onClick={handleSwitch}>{props.viewPlaylistControls ? "Show Songs" : "Edit Playlists"}</button>
          <button className="shuffle-button" onClick={handleShuffle}>shuffle</button> 
        </div>
       
        
      </div>
    )
  }
export default Controls 