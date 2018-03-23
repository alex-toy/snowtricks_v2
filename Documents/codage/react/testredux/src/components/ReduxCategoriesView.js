import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from "react-router-dom";
import  { addCategory } from '../actions/actions'

import CommentList from './CommentList'

import AllCategoriesView from './AllCategoriesView'


class ReduxCategoriesView extends Component {
	
	
	
	componentDidMount() {
		
		console.log(this.props.choicecat)
		
	}
	
	
	
	
  
  render() {
    
    
    const {choicecat} = this.props
    
    
    
    
	var arraypoststemp = Object.entries(this.props.posts)
	var arrayposts = arraypoststemp.filter( id_post => id_post[1].category === choicecat)
	
  	
		return (
	  
				<div className="CategoriesView">
				
				
					Naaaaame of the category : {choicecat} <br/> 
				
				
					<ul>{arrayposts.map((id_post) => 
						<div className="post">
						<li key={id_post[0]}> 
				
							title : {id_post[1].title} <br />
							author : {id_post[1].author} <br />
							body : {id_post[1].body} <br />
							category : {id_post[1].category}<br />
							
							<Link
									to={'/posts/' + id_post[0]}
								>see that post</Link>

						</li></div>)}
					</ul>
					
					
				
				</div>
		)
	}
	

}





function mapStateToProps ({
	posts,
	comments,
	categories }) { return {
  
  	posts,
	comments,
	categories
  
  }
}



export default connect(
  mapStateToProps
)(ReduxCategoriesView)

















