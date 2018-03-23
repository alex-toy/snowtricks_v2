import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import  { addComment } from '../actions/actions'




class AddCommentForm extends Component {

	
	ID = () => {
		return '_' + Math.random().toString(36).substr(2, 9);
	}
	
	
	
	storeComment = (data) => {
		fetch('http://localhost:3001/comments', {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json' 
  			},
  			method: "POST",
  			body: JSON.stringify(data)
		})
		.then( rep => rep.json() )
		.catch(error =>  console.log(error));
	}
	
	
	
	
	handleSubmit = (e, postId) => {
		e.preventDefault()
		const values = Object.assign( {}, serializeForm(e.target, { hash: true }), postId )
		var randomid = this.ID()
		this.storeComment({
			id: randomid,
			timestamp: Date.now(),
			body: values.body,
			author: values.author,
			parentId: values.postId
		})
		this.props.AddComment(randomid, values.postId, values.author, values.body)
	}
	
	
  
  
  render() {
    
    
    const {posts, postId} = this.props
  	
  	var arrayposts = Object.keys(posts)
  	
    return (
	<div>
                
    <div className="AddCommentForm">
    	<label>add a comment</label>
    	<form onSubmit={(e) => this.handleSubmit(e, {postId})} className='create-contact-form'>
				  
				  <div className='create-contact-details'>
					<input className='commentInput' type='text' name='author' placeholder='author'/><br />
					<input className='commentInput' type='text' name='body' placeholder='body'/><br />
					<button className='commentInputButton'>Add comment</button>
				  </div>
		</form>
    </div>
    	
        
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
	
	AddComment: (rndid, newparentId, newauthor, newbody) => { 
  		
  		dispatch(addComment({ newid : rndid, newparentId : newparentId, newauthor : newauthor, newbody : newbody }))
	}
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(AddCommentForm)












