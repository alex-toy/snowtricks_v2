import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link } from "react-router-dom";

import  { addComment, addPost } from '../actions/actions'

import PostList from './PostList'
import PostdetailView from './PostdetailView'

import BigHeader from './BigHeader'
import CategoriesView from './CategoriesView'





class SinglePostById extends Component {


	fetchPosts = () => {
		fetch( 
			'http://localhost:3001/posts', 
			{ headers: { 'Authorization': 'whatever-you-want' },
			method: "GET",
		 }
		).then( rep => rep.json()).then(data => 
			Object.entries(data).map( obj => this.props.dispatch(addPost(
			{
				newid : obj[1].id, 
				newtitle : obj[1].title, 
				newauthor : obj[1].author, 
				newbody : obj[1].body,
				newcategory : obj[1].category,
				timestamp : obj[1].timestamp,
				voteScore : obj[1].voteScore,
			}),
			this.fetchComments(obj[1].id) ))
	)}
	
	
	componentDidMount() {
		
		
		this.fetchPosts()
		
	}

	
  render() {
  
	const { postId } = this.props
	var arraypoststemp = Object.entries(this.props.posts)
	
	console.log('posts', this.props.posts)
	
	
	
	var singlePost = arraypoststemp.filter( id_post => id_post[0].toString() ===  postId.toString())
	
	
	return(
  	<div>
  	
        <div className="app">
					<div className="list-books">
						<div className="list-books-content">
							
							<h1>Post detail view : </h1>
							
							
							
							title : {singlePost[1].title} <br />
							author : {singlePost[1].author} <br />
							body : {singlePost[1].body} <br />
							category : {singlePost[1].category}
							
							
							
							
							
							
							
							<div className="encart">
								<Link
									to='/'
								>root</Link>
							</div>
							
						</div>
				</div>
        	</div>
        
  	
  	</div>
  	);
	
	
	
	
  	
  	
  	
  	
  	
  	
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




























