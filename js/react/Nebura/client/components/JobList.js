import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const JobList = (props) => {


  const fakeObject = [

    { id: 1, title: 'HEHE', text: 'HAHAHA', link: 'fakeLink '},
    { id: 2, title: 'HEHE', text: 'HAHAHA', link: 'fakeLink '}

  ]
  

  const renderJobList = fakeObject.map((job) => {
    
    return (
      // <li key={ book.title } className="list-group-item">{ book.title }</li>

      <li 
        key={ job.id }
        className="">
          <a href={ job.link }>
  
            { job.title }
            { job.text }

          </a>
        
      </li>
  
    )

  });

  return(
    
    <div className="asa">
      { renderJobList }
    </div>

    
  );

}
  
export default JobList;



 




        



