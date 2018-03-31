import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import CommentList from './CommentList'





class SinglePost extends Component {


	state = {
		foodModalOpen: false,
		postModalOpen: false,
		food: null,
		ingredientsModalOpen: false,
		loadingFood: false,
		posts : null,
		Idarray : []
	  }
	  
	  

  render() {
  
	const { choicecat, posts} = this.props
	
	
	var arraypoststemp = Object.entries(this.props.posts)
	var arrayposts = arraypoststemp.filter( id_post => id_post[1].category === choicecat)
		
	
	return(
  	<div>
  	
        <div className="app">
					<div className="list-books">
						<div className="list-books-content">
							
							<h1>Post detail view : </h1>
							
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
							
							
							
							<div className="encart">
								<Link
									to='/'
								>root</Link>
							</div>
							
						</div>
				</div>
        	</div>
        
  	
  	</div>
  	);
	
	
	
	
  	
  	
  	
  	
  	
  	
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
)(SinglePost)




























