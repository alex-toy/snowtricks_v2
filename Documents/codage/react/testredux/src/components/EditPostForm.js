import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import  { changePost } from '../actions/actions'





class EditPostForm extends Component {

	
	editPost = (id, data) => {
		fetch('http://localhost:3001/posts/' + id, {
  			headers: { 
  				'Accept' : 'application/json',
  				'Authorization': 'whatever-you-want',
  				'Content-Type' : 'application/json'
  			},
  			method: "PUT",
  			body: JSON.stringify(data)
		})
		.then( rep => rep.json())
		.then( data => this.props.UpdatePost(data.id, data.title, data.body))
		.catch(error =>  console.log(error));
	}
	
	
	
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		this.editPost(this.props.postId, {
			title: values.title,
			body: values.body,
		})
		
	}
	
	
	
  
  render() {
    
    return (
	
		<div className="AddPostForm">
    	<form onSubmit={(e) => this.handleSubmit(e)} className='create-contact-form'>
		<label>Edit that post</label>
		  <div className='create-contact-details'>
		  	<input className='postInput' type='text' name='title' placeholder='title'/><br />
			<input className='postInput'  type='text' name='body' placeholder='body'/><br />
			<button className='postInputButton'>Edit post</button>
		  </div>
		</form>
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
	
	UpdatePost: (id, newtitle, newbody) => {
  		dispatch(changePost ({ id : id, param : 'title', newValue : newtitle}))
  		dispatch(changePost ({ id : id, param : 'body', newValue : newbody}))
	}
	
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(EditPostForm)












