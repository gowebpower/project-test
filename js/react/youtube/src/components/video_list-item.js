import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => { // ES6 syntax.  instead of passing props, i can pass {video} ; grab video property in props arguement, save it to video variable automatically.


	const imageUrl = video.snippet.thumbnails.default.url;
	const videoTitle = video.snippet.title;
	// const video = props.video;

	console.log(video);

	// onInputChange(e){
  //   console.log(e.target.value);
  // }

	return (
		<li onClick={ () => onVideoSelect(video) } > 

			<img src= { imageUrl } />
			<h5> { videoTitle } </h5>

		</li>
	);
};

export default VideoListItem;