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
		.then( rep => console.log(rep.status) )
		.catch(error =>  console.log(error));
	}
	
	
	ID = () => {
		return '_' + Math.random().toString(36).substr(2, 9);
	}
	
	
	handleSubmit = (e) => {
		e.preventDefault()
		const values = serializeForm(e.target, { hash: true })
		var randomid = this.ID()
		this.storePosts({
			id: randomid,
			timestamp: Date.now(),
			body: values.body,
			author: values.author,
			category: values.category
		})
		this.props.AddPost(randomid, values.title, values.author, values.body, values.category)
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
  	
  	
  	const listcategories = arraycat.map( cat => <option value={cat.name}>{cat.name}</option> );
  	
  	
  	
    return (
	
		<div className="AddPostForm">
    	<form onSubmit={(e) => this.handleSubmit(e)} className='create-contact-form'>
		<label>add a post</label>
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
	
	AddPost: (rndid, newtitle, newauthor, newbody, newcategory) => {
  		dispatch(addPost ({ newid : rndid, newtitle : newtitle, newauthor : newauthor, newbody : newbody, newcategory : newcategory }))
	},
	
	addCategory: (name, path) => { dispatch(addCategory({ name : name, path : path })) }
	
	
});




export default connect(
  mapStateToProps, mapDispatchToProps
)(AddPostForm)












