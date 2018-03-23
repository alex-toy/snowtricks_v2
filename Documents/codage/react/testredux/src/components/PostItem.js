import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import  { addComment } from '../actions/actions'
import { Route, Link } from "react-router-dom";

import CommentList from './CommentList'
import AddCommentForm from './AddCommentForm'



class PostItem extends Component {

	
  
  render() {
    
    
    const {posts, key} = this.props
  	
  	var arrayposts = Object.keys(posts)
  	
    return (
      <div>
		
    	
    	
    		<li key={posts[key].id}> 
    			title : {posts[key].title} <br/> 
    			body : {posts[key].body} <br/>
    			author : {posts[key].author} <br/> 
    			category : {posts[key].category} <br/> 
    			id : {key}
    			
    			<CommentList postId={key} />
    			
    			
    			<AddCommentForm key={key} />
    			
                
                <form onSubmit={(e) => this.handleSubmit(e, {key})} className='create-contact-form'>
				  
				  <div className='create-contact-details'>
					<input type='text' name='author' placeholder='author'/>
					<input type='text' name='body' placeholder='body'/>
					<button>Add comment</button>
				  </div>
				</form>
                
                
				
				<Link
				
					to='/post'
				>See that post</Link>
				

    		</li>
    	
    	
        
	</div>
        
    )
  }
}



function mapStateToProps ({
	posts,
	comments,
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
	}
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(PostItem)












