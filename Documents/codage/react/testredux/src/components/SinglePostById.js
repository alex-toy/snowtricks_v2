import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from "react-router-dom";

import  { addComment, addPost } from '../actions/actions'

import PostList from './PostList'
import PostdetailView from './PostdetailView'

import BigHeader from './BigHeader'
import CategoriesView from './CategoriesView'





class SinglePostById extends Component {

	
	componentDidMount() {
		
		var arraypoststemp = Object.entries(this.props.posts)
	
	console.log('arraypoststemp', arraypoststemp)
	
	var singlePost = arraypoststemp.filter( id_post => id_post[0].toString() ===  this.props.postId.toString())
	
	console.log('singlePost', singlePost.length)
		

		
	}
	
	
  render() {
  
	const { postId, posts } = this.props
	var arraypoststemp = Object.entries(posts)
	
	console.log('arraypoststemp', arraypoststemp)
	
	var singlePost = arraypoststemp.filter( id_post => id_post[0].toString() ===  postId.toString())
	
	console.log('singlePost', singlePost.length)
	
	if(singlePost[1] == "undefined"){
	return(
  	<div>
  	
        <div className="app">
					<div className="list-books">
						<div className="list-books-content">
							
							<h1>Post detail view : </h1>
							
							
							
							
						</div>
				</div>
        	</div>
        
  	
  	</div>
  	);}else{
  	return(
  	<div>
  	
        <div className="app">
					<div className="list-books">
						<div className="list-books-content">
							
							<h1>Post detail view test: </h1>
							
							title : {singlePost[1].title} <br />
							author : {singlePost[1].author} <br />
							body : {singlePost[1].body} <br />
							category : {singlePost[1].category}
							
							
						</div>
				</div>
        	</div>
        
  	
  	</div>
  	);
  	
  	
  	
  	
  	}
	
	
	
	
  	
  	
  	
  	
  	
  	
  	}
}




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
)(SinglePostById)




























