import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";

import  { addPost, addComment } from '../actions/actions'
import Params from './Params'



class App extends Component {


	state = {
		loadingPost: false,
		posts : null,
		Idarray : [],
		postModalOpen: false,
	  }
	  
	  
	openPostModal = () => { console.log('ici'); this.setState( () => ({ postModalOpen: true })) }
	
  
  
	closePostModal = () => { this.setState(() => ({ postModalOpen: false })) }
	    
	
	storeComment = (data) => {
		fetch('http://localhost:3001/comments', {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
  			},
  			method: "POST",
  			body: data
		})
	}
	
	
	
	storePosts = (data) => {
		fetch('http://localhost:3001/posts', {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json'
  			},
  			method: "POST",
  			body: JSON.stringify(data)
		})
		.then( rep => console.log(rep.status) )
		.catch(error =>  console.log(error));
	}
	
	
	
	fetchPostsById = (postId) => {
		fetch( 'http://localhost:3001/posts/' + postId, { 
			headers: { 'Authorization': 'whatever-you-want' },
			method: "GET",
			})
	}
	
	

	
	fetchComments = (idPost) => {
	
		var url = 'http://localhost:3001/posts/' + idPost + '/comments'
		fetch( url, { headers: { 'Authorization': 'whatever-you-want' }})
		.then( rep => rep.json())
		.then(data => 
			
			Object.entries(data).map( obj => this.props.dispatch(addComment(
			{
				newid : obj[1].id, 
				newtitle : obj[1].title, 
				newauthor : obj[1].author,
				newscore : obj[1].voteScore,
				newbody : obj[1].body,
				newparentId : obj[1].parentId,
				timestamp : obj[1].timestamp
			}))
			
		));
	}
	
	


	fetchPosts = () => {
		fetch( 
			'http://localhost:3001/posts', 
			{ headers: { 'Authorization': 'whatever-you-want' },
			method: "GET",
		 })
		.then( rep => rep.json())
		.then(data => 
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
	
	
	
	getIds = () => {
		fetch( 
			'http://localhost:3001/posts', 
			{ headers: { 'Authorization': 'whatever-you-want' },
			method: "GET",
		})
		.then( rep => rep.json() )
		.then( data =>  data.map( post => post.id ))
		.then( data =>  data.map( postid => this.setState({ Idarray : this.state.Idarray.concat(postid)}) ))
	}
	
	
	
	ID = () => { return '_' + Math.random().toString(36).substr(2, 9); }
	
	
	
	componentDidMount() {
		
		
		this.fetchPosts()
		
		
		this.getIds()
		

		
	}
	
	
	onSearchingBook = (query) => {
  
  		console.log(query)
  	
  }


  render() {
	
  	return(
  	<div className="container">
  		
  		
  		<Params />
  		
  		
  	</div>
  	);}
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



export default withRouter(connect(
  mapStateToProps
)(App))




























