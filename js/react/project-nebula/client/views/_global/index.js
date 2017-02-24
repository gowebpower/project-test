import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/actionCreators';
import Global from './global.jsx';


function mapStateToProps(state){
  return{
    jobList: state.jobList
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Global);

export default App;

