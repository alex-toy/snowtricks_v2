import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReduxCategoriesView from './CategoriesView'
import { connect } from 'react-redux'
import CategoriesView from './CategoriesView'
import PostList from './PostList'
import SinglePost from './SinglePost'
import SinglePostById from './SinglePostById'


const Params = () => (
  <Router>
    <div>
      <h2>Accounts</h2>
      <ul>
        <li>
          <Link to="/category/redux">redux</Link>
        </li>
        <li>
          <Link to="/category/react">react</Link>
        </li>
        <li>
          <Link to="/category/udacity">udacity</Link>
        </li>
        <li>
          <Link to="/">root</Link>
        </li>
      </ul>

      <Route exact path="/" component={root} />
      
      
      <Route path="/category/:cat" component={Child} />
      
      
      <Route exact path="/posts/:id" component={post} />
       
      


    </div>
  </Router>
);




const Child = ({ match }) => (
  <div>
    <h3>Category : {match.params.cat}</h3>
    
    <CategoriesView choicecat={match.params.cat} />
    
    
  </div>
);




const root = ({ match }) => (
  <div>
   
    
   <PostList />
    
    
  </div>
);



const post = ({ match }) => (
  <div>
   <h3>postId : {match.params.id}</h3>
   
   
   
   <SinglePostById postId={match.params.id} />
    
	

    
  </div>
);





function mapStateToProps ({
	posts,
	comments,
	categories }) { return {
  
  	posts,
	comments,
	categories
  
  }
}



export default connect(
  mapStateToProps
)(Params)



