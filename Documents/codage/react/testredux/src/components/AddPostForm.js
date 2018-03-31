import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'

import  { addPost, addCategory } from '../actions/actions'





class AddPostForm extends Component {
	
	
	
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
		.then( rep => rep.json() )
		.then( data => this.props.AddPost(data.id, data.title, data.author, data.body, data.category, data.timestamp) )
		.catch(error =>  console.log(error));
	}
	
	
	ID = () => { return '_' + Math.random().toString(36).substr(2, 9); }
	
	
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		var randomid = this.ID()
		var postedOn = Date.now()
		this.storePosts({
			id: randomid,
			timestamp: postedOn,
			title: values.title,
			body: values.body,
			author: values.author,
			category: values.category
		})
	}
	

	
	fetchCategories = () => {
		fetch( 
			'http://localhost:3001/categories', { 
			headers: { 'Authorization': 'whatever-you-want' },
			method: "GET"
		}
		).then( rep => rep.json()).then( data => {
			data.categories.map( cat => 
				
				this.props.addCategory(cat.name, cat.path )
				
			)
		}
	)}
	
	
	componentDidMount() {
		this.fetchCategories()
	}
	
	
  
  render() {
    
    
    const { categories} = this.props
  	
  	
  	var arraycat = Object.values(categories)
  	
  	
  	const listcategories = arraycat.map( cat => <option key={cat.name} value={cat.name}>{cat.name}</option> );
  	
  	
  	
    return (
	
		<div className="AddPostForm">
    	<form onSubmit={(e) => this.handleSubmit(e)} className='create-contact-form'>
		<label>Add a post</label>
		  <div className='create-contact-details'>
		  	<input className='postInput' type='text' name='title' placeholder='title'/><br />
			<input className='postInput'  type='text' name='author' placeholder='author'/><br />
			<input className='postInput'  type='text' name='body' placeholder='body'/><br />
			<select className='postInput' name='category'> {listcategories} </select><br />
			<button className='postInputButton'>Add post</button>
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
	
	AddPost: (rndid, newtitle, newauthor, newbody, newcategory, newtimestamp) => {
  		dispatch(addPost ({ newid : rndid, newtitle : newtitle, newauthor : newauthor, newbody : newbody, newcategory : newcategory, timestamp : newtimestamp }))
	},
	
	addCategory: (name, path) => { dispatch(addCategory({ name : name, path : path })) }
	
	
});




export default connect(
  mapStateToProps, mapDispatchToProps
)(AddPostForm)












