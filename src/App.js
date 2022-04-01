import { useEffect, useState } from 'react';
import './App.css';
import VideoList from './video-list.js';
import Controls from './controls.js';
import PlaylistControls from './PlaylistControls.js';
import VideoPlayer from './VideoPlayer';
import useLocalStorage from './useLocalStorage.js';

const apiKey = "API KEY HERE"

function App() {
  const [playlists, setPlaylists] = useLocalStorage("playlists",[])
  const [selectedPlaylists, setSelectedPlaylists] = useState([])
  const [currentVideo, setCurrentVideo] = useState(0)
  const [songs, setSongs] = useState([])
  const [search, setSearch] = useState("")
  const [viewPlaylistControls, setViewPlaylistControls] = useState(true)
  
  let array = [];
  const fetchAll = (token = "", playlistID) =>{
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=${apiKey}&pageToken=${token}`)
    .then(res => res.json())
    .then(json => {
      let token = json.nextPageToken
      if (token){
        fetchAll(token, playlistID)
        return json
      }else{
        return json
      }
    })
    .then(json => array = [...array, ...json.items])
    .then(() => setSongs(array))
  }
  //update songs
  useEffect( ()=>{
    if (playlists.length == 0 || playlists.findIndex(x => x[1].id === true) === -1){
      setSongs([]);
    }
    array = [];
    playlists.map((item, idx) => {
      if (item[1]){
        fetchAll("", item[0].id)
      }
    })
    
  }, [playlists])
  
  const nextVideo = () =>{
    if (currentVideo + 1 < songs.length) {
      setCurrentVideo(currentVideo+1)
    }
  }
  const prevVideo = () =>{
    if (currentVideo > 0) {
      setCurrentVideo(currentVideo-1)
    }
  }
  
  return (
    <div className="App" >
      {songs && <VideoPlayer nextVideo={nextVideo} currentVideo={currentVideo} songs={songs} />}
      <div>
        {playlists && 
          <Controls 
            nextVideo={nextVideo} 
            prevVideo={prevVideo} 
            songs={songs} 
            currentVideo={currentVideo} 
            setCurrentVideo={setCurrentVideo} 
            setPlaylist={setSongs} 
            viewPlaylistControls = {viewPlaylistControls}
            setViewPlaylistControls  = {setViewPlaylistControls}
          />
        }
        {!viewPlaylistControls && 
          <VideoList 
            songs = {songs}
            currentVideo = {currentVideo}
            setCurrentVideo = {setCurrentVideo}
            search = {search}
            setSearch = {setSearch}
          />
        }
        {viewPlaylistControls &&
          <PlaylistControls 
            playlists = {playlists}
            apiKey = {apiKey}
            setPlaylists = {setPlaylists}
            setSelectedPlaylists = {setSelectedPlaylists}
            selectedPlaylists = {selectedPlaylists}
          />
        }
      </div>
    </div>
  );
}

export default App;