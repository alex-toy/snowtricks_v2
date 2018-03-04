import React, { Component } from 'react';
import { Link } from 'react-router-dom'



// const SearchBookLink = (props) => (
// 	<div className='list-contacts-top'>
//         	<Link
//             	to='/search'
//             	className='search-books'
//         	>Search books</Link>
//         </div>
// );




class SearchBookLink extends Component {


  render() {
  
    return (
        
		<div className='list-contacts-top'>
        	<Link
            	to='/search'
            	className='search-books'
        	>Search books</Link>
        </div>
          
        
      )  
    
  }
}






export default SearchBookLink
