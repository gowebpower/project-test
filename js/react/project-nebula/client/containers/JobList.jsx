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
      componentVisibility: 'none', // Used for showing this component once initial state is updated.
      numberOfItemsPerSection: (this.props.items) ? this.props.items : 5 , // Determin how many items to show per section. Default is 5
      currentSection: (this.props.startFrom) ? this.props.startFrom : 0, // 0 is first section
      linkRootUrl: 'https://chp.tbe.taleo.net/chp04/ats/careers/requisition.jsp?org=NEXON&cws=1&rid=',
      apiFetchDataURL: 'https://gapi.nexon.net/careers/jobs/company/Nebula',
      jobItemsLength: null,
      totalSection: null,
      offset: null, 
      arrowTopVisibility: null,
      arrowBottomVisibility: null,
      jobListHeight: null
    };
  }  


  componentWillMount() { 
    
    /* Real data => fetch actual job data w/ ajax */
    this.ui.fetchJobList();

    /* Map props to state */
    this.ui.syncPropsToState();

  }

  componentDidMount() {

    // bug fix for transition effect. ( when I run clientHeight on componentDidMount, transition effect is gone. )
    setTimeout( () => {
      this.ui.syncUI();
      window.addEventListener('resize', this.ui.syncUI);

    }, 200);

    setTimeout( () => {
      this.setState({ componentVisibility: 'visible' });
    }, 500)
    
  }

  // Whenever props are updated, this runs.
  componentWillReceiveProps(nextProps) {

    setTimeout( () => {
      this.ui.syncPropsToState();
    }, 200)

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ui.syncUI);
  }


  /* This Components UI Methods */

  ui = {

    // Fetch Job List
    fetchJobList: () => {
      // link https://chp.tbe.taleo.net/chp04/ats/careers/requisition.jsp?org=NEXON&cws=1&rid=685

      axios.get(this.state.apiFetchDataURL).then( (response) => {
        // console.log(response.data);

        /* fetch JobList Data*/
        this.props.a_fetchJobList(response.data);

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

      console.log(this.state);

      // If there is only one section hide both arrows

      if ( state.totalSection == 0 ){

        console.log('first');
        arrowTopVisibility = 'hide';
        arrowBottomVisibility = 'hide';

        this.setState({ arrowTopVisibility, arrowBottomVisibility });

      } 

      // If there is more than one section.
      else if ( state.totalSection > 0  ){

        console.log('2nd');

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
      const $liStyle = getComputedStyle($li) // to get margins of $li

      var jobListHeight = $li.getBoundingClientRect().height; // to get value in decimal ( This needs to be accurate cus value is em.)
      
      jobListHeight += Number( $liStyle.marginTop.replace('px','') ) + Number( $liStyle.marginBottom.replace('px','') );
      jobListHeight = jobListHeight * state.numberOfItemsPerSection;

      // setTimeout( () => {
      //   console.log( 'later ' +$liHeight );

      // }, 1000)

      // Get Offset Height with new jobListHeight
      var offset = jobListHeight * state.currentSection;

      this.setState({ jobListHeight, offset });
 
    },

    // Assign props to state:  Get how many list items from props and determine how many section based on 'numberOfItemsPerSection'

    syncPropsToState: () => {

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

    
    const { ui, state, props } = this;
    const jobList = props.jobList.map((job , i) => {

      return (
        // <li key={ book.title } className="list-group-item">{ book.title }</li>
        <li key={ i } >
          <Link href={ state.linkRootUrl + job.jobCode } target="_blank">
            
            <div className="title">{ job.title }</div>
            <div className="text">{ job.highlight }</div>

          </Link>
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