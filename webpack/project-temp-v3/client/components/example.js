import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const Photo = (props) => {

  const { post, i, comments } = props;

  return(

    <figure className="grid-figure">
      <div className="grid-photo-wrap">
        <Link to={`/view/${post.code}`}> 
          
          <img src={ post.display_src } alt={ post.caption } className="grid-photo" />

        </Link>
        
        <ReactCSSTransitionGroup component="div"
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

          <span key={post.likes} className="likes-heart"> { post.likes } </span>

        </ReactCSSTransitionGroup>

      </div>
      
      <figcaption>
        <p>{post.caption}</p>
        <div className="control-buttons">
          <button onClick={ props.a_increment.bind( null, i) } className="likes">&hearts; {post.likes}</button>
          <Link className="button" to={`/view/${post.code}`}>
            <span className="comment-count">
              <span className="speech-bubble"></span>
              {comments[post.code] ? comments[post.code].length : 0 }
            </span>
          </Link>

        </div>
      </figcaption>

    </figure>

  )

}
  
export default Photo;





        



