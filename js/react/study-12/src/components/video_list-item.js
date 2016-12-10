import React from 'react';

const VideoItem = ({video, onVideoSelect}) =>{

  const videoTitle = video.snippet.channelTitle;
  const videoThumbnail = video.snippet.thumbnails.default.url;

  return(
    <li className='list-group-item' onClick={ () => onVideoSelect(video) } >
      <div className="video-list media">
        <div className="media-left">
          <img src={ videoThumbnail } className="media-object" />
        </div>

        <div className="media-body">
          <div className="media-headering">
            { videoTitle }

          </div> 
        </div>

      </div>  
    </li>
  )

}

export default VideoItem;