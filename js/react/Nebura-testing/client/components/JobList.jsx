// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


// ---------------------- Components

// Empty.


// ******************************************************************
// ----------------------- Export
// ******************************************************************



const JobList = (props) => {


  const fakeObject = [

    { id: 1, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 2, title: 'HEHE', text: 'HAHAHA', link: 'https://www.google.com/'},
    { id: 3, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 4, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 5, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 6, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 7, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 8, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 9, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 10, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 11, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 12, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 13, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 14, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 15, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 16, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 17, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 18, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 19, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 20, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 21, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 22, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},
    { id: 23, title: 'Sr. World & Level Designer', text: 'Experienced crafter of engaging worlds and scenarios', link: 'https://www.google.com/'},

  ]
  

  const renderJobList = fakeObject.map((job) => {
    
    return (
      // <li key={ book.title } className="list-group-item">{ book.title }</li>

      <li key={ job.id } >
        <a href={ job.link } target="_blank">
          
          <div className="title">{ job.title }</div>
          <div className="text">{ job.text }</div>

        </a>
      </li>
  
    )

  });

  return(
    
    <div className="ui-jobList">
      <div className="arrow up icon-arrow-up"></div>
      <ul>
        { renderJobList }
      </ul>
      <div className="arrow dowbn icon-arrow-down"></div>
    </div>

    
  );

}
  
export default JobList;





        



