import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from "react-router-dom";
import  { addCategory } from '../actions/actions'

import CommentList from './CommentList'

import OneCategoriesView from './OneCategoriesView'




class CategoriesList extends Component {
	
	
	state = { choicecat : "redux" }
	
	
	
	
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
  

	const handleSubmit = (cat) => { 
		this.setState({ choicecat : cat });
		
	}
	
    
    const {posts, categories} = this.props
    const {choicecat} = this.state
  	
  	var arraycat = Object.values(categories).concat({name: "all", path: "all"})
  	var arrayposts = Object.values(posts)
  	
  	
  	const listcategories = arraycat.map( cat => <li value={cat.name}><Link to={'/' + cat.name}> {cat.name}</Link><br /></li> );
  	
  	
  	
    return (
    <div>
		
    			<div className="CategoriesView">
				
				<h1>Category : </h1>
    		
    			<ul>{listcategories}</ul>

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
	addCategory: (name, path) => { dispatch(addCategory({ name : name, path : path })) }
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(CategoriesList)












