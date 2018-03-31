import React, { Component } from 'react'

import AllCategoriesView from './AllCategoriesView'


class OneCategoriesView extends Component {
	
	
	formattedPostdate = (timestamp) => {
  		var a = new Date(timestamp * 1000);
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
    
    
    const {arraycat, arrayposts, choicecat} = this.props
  	
  	if(choicecat === "react" || choicecat === "redux" || choicecat === "udacity"){
  	
		return (
	  
				<div>
				
					<ul>{arrayposts.filter( post => post.category === choicecat).map((post) => 
						<div className="post" key={post.id}>
						<li key={post.id}> 
				
							Title : {post.title} <br />
							Author : {post.author} <br />
							Body : {post.body} <br />
							Category : {post.category}<br />
							Score : {post.voteScore}<br />
							Posted on {this.formattedPostdate(post.timestamp)} <br/>

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










