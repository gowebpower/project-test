
// ----------------------- 
/*
	###  APIs
*/

import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

// ----------------------- 


// ----------------------- 
/*
	### Components
*/

import SearchBar from './components/search_bar'; // SearchBar is actually special variable, so whatever search_bar I have set as export default, it will be returned.
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// ----------------------- 



const API_KEY = 'AIzaSyBWIwKK93azGIdi6tZfpbcPO5PmtvQ_3sc';


// Create a new componenet. This componenet should produce some HTML


class App extends Component {
	constructor(props){
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null 
		};

		this.videoSearch('overwatch');

	}

	videoSearch(term){
		YTSearch({key: API_KEY, term: term }, (videos) => {
			this.setState({  
				videos: videos,
				selectedVideo: videos[0]

			});
		});
	}
 
	render(){

		const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 500 )

	  return(
	    <div> 
	      < SearchBar onSearchTermChange = { videoSearch } />
	      < VideoDetail video = { this.state.selectedVideo } />
	      < VideoList 
	      		onVideoSelect = { video => this.setState({ selectedVideo: video }) }
	      		videos = { this.state.videos } />
	    </div>
	  )
	} 
}






// const App = () => {

//   return(
//     <div> 
//       <SearchBar />
//     </div>
//   ) 

// }

// Take this componenet's generated HTML and put it on the page ( in the DOM )

ReactDOM.render(<App/>, document.querySelector('.container'));


