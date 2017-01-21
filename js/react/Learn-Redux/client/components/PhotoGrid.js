import React from 'react';
import Photo from './Photo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const PhotoGrid = (props) => {

  const renderList = props.posts.map( (post, i) => (
    
    <Photo key={i} i={i} post={post} {...props } />

  ));

  return(
    <div className="photo-grid">
      
      { renderList }
      
    </div>
  )

}


// const PhotoGrid = React.createClass({

//   render(){

//     return(
//       <div className="photo-grid">
   
//         { 

//           this.props.posts.map((post,i) => <Photo />)

//         }
        
//       </div>
//     )

//   }

// })

export default PhotoGrid;


