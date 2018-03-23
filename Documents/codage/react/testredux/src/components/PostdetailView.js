import React, { Component } from 'react'
import { connect } from 'react-redux'

import  { addComment } from '../actions/actions'

import CommentList from './CommentList'



class PostdetailView extends Component {

	
	
	
	handleSubmit = () => { alert('ok')   }
	
	
  
  
  render() {
    
    
    const {posts} = this.props
  	
  	var arrayposts = Object.keys(posts)
  	
    return (
      <div>
		
    	<h1>posts : </h1>
    	
    	<ul>{arrayposts.map((key) => 
    		<div className="encart">
    		<li key={posts[key].id}> 
    			title : {posts[key].title} <br/> 
    			body : {posts[key].body} <br/>
    			author : {posts[key].author} <br/> 
    			id : {key}
    			
    			<CommentList postId={key} />
    			
    			<button onClick={(event) => this.props.AddComment(key, event.target.value)} >Add comment</button>
    			
    			<form>
				  <label> Name: <input type="text" name="name" /> </label>
				  <input type="submit" value="Submit" onSubmit={(event) => this.props.AddComment(key, event.target.value)} />
				  <button onSubmit={(event) => this.props.AddComment(key, event.target.value)} >Add comment</button>
				</form>
				
				
				
				<div className='search-container'>
                  
                  <div className='search'>
                    <input
                      className='food-input'
                      type='text'
                      placeholder='name'
                      ref={(input) => this.input = input}
                    />
                    
                    <button
                      className='icon-btn'
                      onClick={(event) => this.props.AddComment(key, event.target.value)}>Add comment
                        
                    </button>
                    
                  </div>
                  
                </div>
				
				
				
				
    			
    		</li></div>)}
    	</ul>
    	
        
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
	AddComment: (idPost, e) => { 
  
  		alert(idPost, e)
  		

  
		dispatch(addComment({ newid : 876654, newparentId : idPost, newauthor : 'vfeze', newbody : 'ezegzgegze' })) 
		
	}
});





export default connect(
  mapStateToProps, mapDispatchToProps
)(PostdetailView)












