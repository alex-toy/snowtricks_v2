import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from 'react-redux'
import CategoriesView from './CategoriesView'
import PostList from './PostList'
import SinglePostById from './SinglePostById'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
  
  
  

const Params = () => (
  <Router>
    <div>
      	
		<Navbar className="AddCommentForm" color="faded" light expand="md">
          <NavbarBrand href="/">Readable</NavbarBrand>
          <NavbarToggler />
          <Collapse  navbar>
            <Nav className="ml-auto" navbar>
              
              <NavItem>
                <NavLink href="/category/redux">redux</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink href="/category/react">react</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink href="/category/udacity">udacity</NavLink>
              </NavItem>
              
               <NavItem>
                <NavLink href="/">root</NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
      
      
      

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



