import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'actions/actionCreators';
import Global from './l-global';


function mapStateToProps(state){
  return{
    posts: state.posts,
    comments: state.comments
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Global);

export default App;

