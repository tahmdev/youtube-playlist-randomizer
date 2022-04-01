import { useEffect, useState } from "react"

const VideoList = (props) =>  {
    const [duplicates, setDuplicates] = useState([])
    const handleListClick = (e) => {
        props.setCurrentVideo(parseInt(e.target.id, 10))
      }
    useEffect(() => {
    let newArr = [...duplicates]
    props.songs.map((item, idx) => {
        let firstIndex = props.songs.findIndex(x => x.snippet.resourceId.videoId === item.snippet.resourceId.videoId)
        if (firstIndex !== idx){
            newArr = [...newArr, idx]
        }
    })
    setDuplicates(newArr)
    }, [props.songs])
    return (
        <div>
            <input className="search-bar" type="text" placeholder="Search songs" onChange={e => props.setSearch(e.target.value)}/>
            <ul className='video-list'>
            {props.songs.map((item, idx) => {
            let re = new RegExp(props.search, "i")
            if(item.snippet.title.match(re)&& duplicates.includes(idx) === false &&item.snippet.title !== "Private video" && item.snippet.title !== "Deleted video" ){
                return (
                <li key={item.snippet.resourceId.videoId + idx} id={idx} className={`video-list-li ${props.currentVideo === idx ? "playing" : null}`} onClick={handleListClick}>{item.snippet.title}</li>
                )
            }
            })}
        </ul>
      </div>
    )
}
export default VideoList