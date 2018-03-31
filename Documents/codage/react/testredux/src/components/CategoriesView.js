import React, { Component } from 'react'
import { connect } from 'react-redux'

import  { addCategory } from '../actions/actions'

import OneCategoriesView from './OneCategoriesView'




class CategoriesView extends Component {
	
 
  
  render() {
	
    
    const {posts, categories, choicecat} = this.props
  	
  	var arraycat = Object.values(categories).concat({name: "all", path: "all"})
  	var arrayposts = Object.values(posts)
  	
  	
    return (
    <div>

    	<OneCategoriesView choicecat={choicecat} arraycat={arraycat} arrayposts={arrayposts} />
    	
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
)(CategoriesView)












