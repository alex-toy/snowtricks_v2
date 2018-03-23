import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from "react-router-dom";
import  { addCategory } from '../actions/actions'

import CommentList from './CommentList'

import AllCategoriesView from './AllCategoriesView'


class OneCategoriesView extends Component {
	
  
  render() {
    
    
    const {arraycat, arrayposts, choicecat} = this.props

  	const listcategories = arraycat.map( cat => <option value={cat.name}>{cat.name}</option> );
  	
  	if(choicecat === "react" || choicecat === "redux" || choicecat === "udacity"){
  	
		return (
	  
				<div>
				
					<ul>{arrayposts.filter( post => post.category === choicecat).map((post) => 
						<div className="post">
						<li key={post.id}> 
				
							title : {post.title} <br />
							author : {post.author} <br />
							body : {post.body} <br />
							category : {post.category}
							

						</li></div>)}
					</ul>
					
				
				</div>
		)
	}else{
	return (
	  
				<div className="CategoriesView">
				
				
					<AllCategoriesView arraycat={arraycat} arrayposts={arrayposts} />
				
				
				</div>
		)
	
	}
	
	
	
	
	
	
	
	
	
	
  }
}








export default OneCategoriesView










