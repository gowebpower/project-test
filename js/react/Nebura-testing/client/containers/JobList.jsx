// ******************************************************************
// ----------------------- Imports
// ******************************************************************

// ---------------------- Libs

import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'; // Ajax request for browser. This work almost identically to jQuery Ajax function.


// ---------------------- Components

import * as actionCreators from 'actions/actionCreators';


// ******************************************************************
// ----------------------- Export
// ******************************************************************

class JobList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      componentVisibility: 'none', // 
      numberOfItemsPerSection: 5, // default setting and this will never change.
      jobItemsLength: null,
      currentSection: null, // 0 is first section
      totalSection: null,
      offset: null,
      arrowTopVisibility: null,
      arrowBottomVisibility: null,
      jobListHeight: null
    };
  }  


  componentWillMount() { 
    
    /* Real data: fetch Job List */
    // this.ui.fetchJobList();


    /* Based on dummy data */
    this.ui.updateUIinfoToState();
 

  }

  componentDidMount() {

    // bug fix for transition effect. ( when I run clientHeight on componentDidMount, transition effect is gone. )
    setTimeout( () => {
      this.ui.syncUI();
      this.setState({ componentVisibility: 'visible' });
      window.addEventListener('resize', this.ui.syncUI);

    }, 400)
    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ui.syncUI);
  }


  /* UI Methods */

  ui = {

    // Fetch Job List
    fetchJobList: () => {
      const url = 'https://jsonplaceholder.typicode.com/posts';
      // https://gapi.nexon.net/careers/jobs/company/Nebula
      // link https://chp.tbe.taleo.net/chp04/ats/careers/requisition.jsp?org=NEXON&cws=1&rid=685


      axios.get(url).then( (response) => {
        // console.log(response.data);

        /* fetch JobList Data*/
        this.props.a_fetchJobList(response.data);

        /* then update joblist length to state*/
        this.ui.updateUIinfoToState();

      });

    },

    // Event for clicking arrow top
    arrowTop: () => {

      const { state } = this;

      var getJobListHeight = state.jobListHeight;

      var currentSection = state.currentSection;

      // if current section is not the first section, -1 to current section
      if ( !currentSection == 0 ){

        currentSection--;

      }

      var offset = getJobListHeight * currentSection;
      

      this.setState({ offset, currentSection },
        
        // callback to make sure updateArrowsStatus() runs based on the latest state.   
        this.ui.updateArrowsStatus

      );

      // setTimeout( () => {
      //   console.log(this.state)

      // }, 500)

    },

    // Event for clicking arrow bottom
    arrowBottom: () => {

      const { state } = this;

      var getJobListHeight = state.jobListHeight;

      var currentSection = state.currentSection;

      // if currentSection is not last section
      if ( currentSection < state.totalSection ){

        currentSection++; 

      }

      var offset = getJobListHeight * currentSection;

      this.setState({ offset, currentSection },
        
        // callback to make sure updateArrowsStatus() runs based on the latest state
        this.ui.updateArrowsStatus

      );

    },

    // Update visibility of Top and Bottom ARROWS 
    updateArrowsStatus: () => {
      

      const { state } = this;

      var arrowTopVisibility = 'show';
      var arrowBottomVisibility = 'show';

      // If there is only one section hide both arrows

      if ( state.totalSection == 0 ){

        arrowTopVisibility = 'hide';
        arrowBottomVisibility = 'hide';

        this.setState({ arrowTopVisibility, arrowBottomVisibility });

      } 

      // If there is more than one section.
      else if ( state.totalSection > 1  ){

        // if current section is in last section, bottom arrow becomes inactive
        if( state.currentSection == state.totalSection ) {

          arrowBottomVisibility = 'inactive';

        }

        // if current section is in first section, top arrow becomes inactive
        else if( state.currentSection == 0 ) {

          arrowTopVisibility = 'inactive';

        }

        this.setState({ arrowTopVisibility, arrowBottomVisibility });

      }

    },

    // Make sure get and update new offset based on current section and new JobListHeight when window size is changed.

    syncUI: () => {

      const { state } = this;

      // Get JobListHeight
      const $li = document.querySelector('.ui-jobList__wrapper li');

      var jobListHeight = $li.getBoundingClientRect().height; // to get value in decimal ( This needs to be accurate cus value is em.)
      const style = getComputedStyle($li)

      
      jobListHeight += Number(style.marginTop.replace('px','') ) + Number( style.marginBottom.replace('px','') );
      jobListHeight = jobListHeight * state.numberOfItemsPerSection;

      // setTimeout( () => {
      //   console.log( 'later ' +$liHeight );

      // }, 1000)

      // Get Offset Height with new jobListHeight
      var offset = jobListHeight * state.currentSection;

      this.setState({ jobListHeight, offset });
 
    },

    // Update initial info to state:  Get how many list items from props and calculate how many section.

    updateUIinfoToState: () => {

      // get total number of joblist items from props
      const jobItemsLength = this.props.jobList.length;

      // get total Section.
      const totalSection = Math.ceil(jobItemsLength / this.state.numberOfItemsPerSection) - 1;


      // setTimeout( () => {
      //   console.log(totalSection)
      // }, 500)

      this.setState({ jobItemsLength, totalSection },
        
        // after getting number of job items and totel section, update arrow visibility
        this.ui.updateArrowsStatus

      );

    }

  }
 

  render(){

    
    const { ui, state } = this;
    const jobList = this.props.jobList.map((job , i) => {


      return (
        // <li key={ book.title } className="list-group-item">{ book.title }</li>
        <li key={ i } >
          <a href={ job.link } target="_blank">
            
            <div className="title">{ job.title }</div>
            <div className="text">{ job.body }</div>

          </a>
        </li>
      )
    
    });


    return(
      <div className={ "ui-jobList " + ( state.componentVisibility ) } >

 
        <div className={ "arrow up icon-arrow-up " + ( state.arrowTopVisibility ) } onClick={ ui.arrowTop } ></div>

        <div className="ui-jobList__wrapper" style={{ height: state.jobListHeight + "px" }} >
          <ul style={{ top: "-" + state.offset + "px" }}>

            { jobList }
            
          </ul>
        </div>
        <div className={"arrow down icon-arrow-down " + ( state.arrowBottomVisibility ) } onClick={ ui.arrowBottom }></div>
      </div>
    );
  }
}



function mapStateToProps(state){
  return{
    jobList: state.jobList
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList);