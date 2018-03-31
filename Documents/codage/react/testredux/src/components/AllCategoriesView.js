import React, { Component } from 'react'


class AllCategoriesView extends Component {
	
  
  render() {
    
    
    const {arraycat, arrayposts} = this.props
  	
  	
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










