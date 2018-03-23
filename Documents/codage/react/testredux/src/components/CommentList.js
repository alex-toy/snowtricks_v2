import React, { Component } from 'react'

import { connect } from 'react-redux'





class CommentList extends Component {

  
  render() {
    
    
    const { comments, postId} = this.props
    
    
  	
  	
  	var commentArray = Object.keys(comments).filter( key => comments[key].parentId === postId )
  	
  	
    
    return (
	<div>
		
		<h2>comments : </h2>
    	
    	<ol>{commentArray.map((key) => 
    	
    		<div className="comment">
    		<li key={comments[key].id} > 
    			author : {comments[key].author} <br/>
    			body : {comments[key].body} <br/>
    			parentId : {comments[key].parentId} <br/>
    			id : {comments[key].id} <br/>
    		</li></div>)}
    		
    	</ol>
    	
    	
    	
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


export default connect(
  mapStateToProps
)(CommentList)








