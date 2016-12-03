import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import YTSearch from 'youtube-api-search';
import SearhBar from './components/search_bar';
import VideoList from './components/video_list';

const API_KEY = 'AIzaSyBhe_d8IsOx4gnzRVBZlgXPwtn8WnqZG_Y';





// Create a new component. This component should produce some HTML

class App extends Component {

  constructor(props){
    super(props);

    this.state = { YTvideos: [] };

    YTSearch( { key: API_KEY, term: 'surfboard' }, (data) => {
      this.setState( { YTvideos: data } );
    })

  }


  render() {
    return(
      <div>
        <SearhBar /> 
        <VideoList videos ={ this.state.YTvideos }/>
      </div>

    )
  }
  
}



// Take this component a generated HTML and putit on the page.


ReactDOM.render(<App />, document.querySelector('.container'));