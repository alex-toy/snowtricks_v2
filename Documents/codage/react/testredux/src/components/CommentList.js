import React, { Component } from 'react'
import { connect } from 'react-redux'
import VoteCommentForm from './VoteCommentForm'



class CommentList extends Component {

  
  
  formattedPostdate = (timestamp) => {
  	var a = new Date(timestamp);
  		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min + ':' + sec ;
		return time;
  }
  
  
  
  render() {
    
    
    const { comments, postId} = this.props
    
    
  	
  	
  	var commentArray = Object.keys(comments).filter( key => comments[key].parentId === postId )
  	
  	
  	
    
    return (
	<div>
		
		<h2>Number of comments : {commentArray.length}</h2>
    	
    	<ol>{commentArray.map((key) => 
    	
    		<div key={key}  className="comment">
    		<li key={key} > 
    			Author : {comments[key].author} <br/>
    			Body : {comments[key].body} <br/>
    			posted on {this.formattedPostdate(comments[key].timestamp)} <br/>
    			
    			<VoteCommentForm commentId={key} voteScore={comments[key].voteScore} /><br/> 
        
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








