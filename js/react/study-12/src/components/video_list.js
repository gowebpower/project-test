import React from 'react';
import VideoItem from './video_list-item';



const VideoList = (props) => {
 

  var videoItems = props.videos.map( (video) =>{

    return <VideoItem key={video.etag} video={ video } onVideoSelect={ props.onVideoSelect } />

  })




  // console.log(videoItems);
 
  return(
    <ul className="col-md-4 list-group">
      { videoItems }
    </ul>

  )
}

export default VideoList;