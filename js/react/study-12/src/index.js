import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBhe_d8IsOx4gnzRVBZlgXPwtn8WnqZG_Y';





// Create a new component. This component should produce some HTML

class App extends Component {

  constructor(props){
    super(props);

    this.state = { YTvideos: [], selectedVideo: null, searchText: 'maplestory' };

    this.onVideoSearch(this.state.searchText);

  }


  onVideoSearch(searchText){

    this.setState( { searchText } );
    YTSearch( { key: API_KEY, term: this.state.searchText }, (data) => {
      this.setState( { YTvideos: data } );
    })

    console.log(this.state.searchText);
  }
  

  render() {
    return(
      <div>
        <SearchBar onInputChange = { (searchText) => this.onVideoSearch(searchText)  } /> 
        <VideoDetail selectedVideo = { this.state.selectedVideo } />
        <VideoList videos ={ this.state.YTvideos } onVideoSelect = { (selectedVideo) => this.setState({ selectedVideo })  } />
      </div>

    )
  }
  
}



// Take this component a generated HTML and putit on the page.


ReactDOM.render(<App />, document.querySelector('.container'));