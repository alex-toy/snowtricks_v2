import React, { Component } from 'react'
import { connect } from 'react-redux'

import  { addCategory } from '../actions/actions'

import CommentList from './CommentList'


class AllCategoriesView extends Component {
	
  
  render() {
    
    
    const {arraycat, arrayposts} = this.props
  	

  	const listcategories = arraycat.map( cat => <option value={cat.name}>{cat.name}</option> );
  	
  	
  	
    return (
      <div>
		
    	
    	<ul>{arraycat.map((cat) => 
    		<div className="CategoriesView">
    		<li key={cat.name}> 
    			
    			
    			name of the category : {cat.name} <br/> 
    			
    			
    			<ul>{arrayposts.filter( post => post.category === cat.name).map((post) => 
					<div className="post">
					<li key={post.id}> 
				
						title : {post.title} <br />
						author : {post.author} <br />
						body : {post.body} <br />
						category : {post.category}

					</li></div>)}
				</ul>
				
    			
    		</li></div>)}
    	</ul>
    	
        
	</div>
        
    )
  }
}








export default AllCategoriesView










