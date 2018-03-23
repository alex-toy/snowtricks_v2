import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import  { addComment, removePost } from '../actions/actions'
import { Link } from "react-router-dom";

import CommentList from './CommentList'
import AddCommentForm from './AddCommentForm'
import AddPostForm from './AddPostForm'
import SelectSortMethod from './SelectSortMethod'
import VoteScoreForm from './VoteScoreForm'





class PostList extends Component {

	
	state = {
		postid : "",
		sortmethod : "voteScore"
	}
	
	
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
	
	
	
	handleSubmit = (e, postId) => {
		e.preventDefault()
		const values = Object.assign( {}, serializeForm(e.target, { hash: true }), postId )
		this.storeComment({
			id: '786565484',
			timestamp: Date.now(),
			body: values.body,
			author: values.author,
			parentId: values.key
		})
		this.props.AddComment(values.key, values.author, values.body)
	}
	

	
	handleSelectSortMethod = (e) => {
		
		this.setState({sortmethod : e})
	}
	
	
	DeletePost = (id_post) => {
		fetch( 
			'http://localhost:3001/posts/' + id_post, 
			{ headers: { 
				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
			},
			method: "DELETE",
		 }
		).then( rep => console.log(rep) )
	}
	
	
	handleDeletePost = (id_post) => {
		this.DeletePost(id_post)
		this.props.RemovePost(id_post)
	}
	
	
  
  
  render() {
    
    
    const {posts} = this.props
    const {sortmethod} = this.state
    
  	var arrayposts = Object.entries(posts)
  	var sortedposts
  	
  	if(sortmethod === "voteScore"){
  	
		sortedposts = arrayposts.sort(function(a, b) {
			return a[1].voteScore - b[1].voteScore;
		});
  	
  	} else if(sortmethod === "timestamp") {
  		sortedposts = arrayposts.sort(function(a, b) {
			return a[1].timestamp - b[1].timestamp;
		});
  	}else{
  		sortedposts = arrayposts.sort(function(a, b) {
			return a[1].voteScore - b[1].voteScore;
		});
  	}
  	
  	
    return (
      <div>

    	
    	<AddPostForm />
    	
    	
    	<SelectSortMethod handleSelectSortMethod={this.handleSelectSortMethod} />
    	
    	
    	<ul>{sortedposts.map((id_post) => 
    		<div className="post">

    		<li key={id_post[0]}> 
    			title : {id_post[1].title} <br/> 
    			body : {id_post[1].body} <br/>
    			author : {id_post[1].author} <br/> 
    			category : {id_post[1].category} <br/>
    			voteScore : {id_post[1].voteScore} <br/>
    			timestamp : {id_post[1].timestamp} <br/> 
    			id : {id_post[0]}
    			

    			<CommentList postId={id_post[0]} />
    			
    			
    			<AddCommentForm postId={id_post[0]} />
    			
				
				
				<button onClick={() => this.handleDeletePost(id_post[0])} className='commentInputButton'>Delete Post</button>
				
				
				
				<VoteScoreForm postId={id_post[0]} voteScore={id_post[1].voteScore} />
                
                                
                <Link to={'/post?postId=' + id_post[0]}>See that post</Link>
                
                
                <br />
				
				<Link
				
					to='/post'
				>See that post old</Link>
				

    		</li>
    		

    		</div>)}
    	</ul>
    	
    	
    	
    	
    	
    
    	
        
	</div>
        
    )
  }
}



function mapStateToProps ({
	posts,
	comments,
	users,
	calendar,
	categories
}) {
  
  return {
  
  	posts,
	comments,
	categories
  
  }
}




const mapDispatchToProps = dispatch => ({
	
	AddComment: (newparentId, newauthor, newbody) => { 
  		
  		dispatch(addComment({ newid : 876654, newparentId : newparentId, newauthor : newauthor, newbody : newbody }))
	},
	
	
	RemovePost: (id) => { 
  		
  		dispatch(removePost({ id : id }))
	}
	
	
	
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(PostList)












