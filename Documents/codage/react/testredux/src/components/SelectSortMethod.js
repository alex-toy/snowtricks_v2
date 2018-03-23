import React, { Component } from 'react'
import { connect } from 'react-redux'

import  { addPost, addCategory } from '../actions/actions'





class SelectSortMethod extends Component {

	
	
	handleSelectSortMethod = (e) => {
		this.props.handleSelectSortMethod(e.target.value)
	}
	
	
	
  
  render() {
    
    
    return (
	
		<div className="AddPostForm">
    	<form onSubmit={(e) => this.handleSelectSortMethod(e)} className='create-contact-form'>
		<label>Choose the sort method : </label>
		  <div className='create-contact-details'>
			<select className='postInput' name='category' onChange={(e) => this.handleSelectSortMethod(e)}>
				<option value='voteScore'>voteScore</option>
				<option value='timestamp'>timestamp</option>
			</select><br />
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
	
	AddPost: (newtitle, newauthor, newbody, newcategory) => {
  		dispatch(addPost ({ newid : 'uguyfgou7667554', newtitle : newtitle, newauthor : newauthor, newbody : newbody, newcategory : newcategory }))
	},
	
	addCategory: (name, path) => { dispatch(addCategory({ name : name, path : path })) }
	
	
});




export default connect(
  mapStateToProps, mapDispatchToProps
)(SelectSortMethod)












