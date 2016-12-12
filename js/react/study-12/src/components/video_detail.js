import React from 'react';

const VideoDetail = ({selectedVideo}) =>{

  if( selectedVideo === null ){

    return(
      <div>Loading...</div>
    )
  }

  const videoId = selectedVideo.id.videoId;
  const videoTitle = selectedVideo.snippet.title;
  const videoDescription = selectedVideo.snippet.description;
  const url = `https://www.youtube.com/embed/${videoId}`;


  return(
    <div className="video-detial col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url}></iframe>
      </div>
      <div className="details">
        <div><h1>{ videoTitle }</h1></div>
        <div>{ videoDescription }</div>
      </div>
    </div>

  );

}

export default VideoDetail;