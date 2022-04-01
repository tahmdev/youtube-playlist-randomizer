import YouTube from 'react-youtube';

const VideoPlayer= (props) => {

    const opts = {
      playerVars: {
        height:0,
        width:0,
        autoplay: 1,
        enablejsapi: 1
      }
    }
    
    if(!props.songs.length){ // I do not know why but this is the only thing hold this together 
      return (<div>Please add a playlist</div>)
    }

    return(
      <div className='video-player-container'>
        <YouTube 
          videoId={props.songs[props.currentVideo].snippet.resourceId.videoId}
          key={props.songs[props.currentVideo].snippet.resourceId.videoId}
          id={"video-player"}
          onEnd={props.nextVideo}
          opts = {opts}
        />
      </div>
    )
  }
  export default VideoPlayer