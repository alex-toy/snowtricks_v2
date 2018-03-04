import React from 'react'
import SearchBookResult from './SearchBookResult'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBookBar extends React.Component {
  
  state = {
	books : []
  }
  
  onSearchingBook = (query) => {
  
  	this.setState({ books : [] })
  	
  	if(query){
		BooksAPI.search(query).then((books) => {
			//console.log(books)
			this.setState({ books })
		})
  	}
  }
  
  
  
  onchangeBookshelf = (shelf, id, actualShelf) => {
    this.props.onchangeBookshelf(shelf, id, actualShelf)
  }
  
  
	onAddToBookshelf = (destinationShelf, book) => {
  		this.props.onAddToBookshelf(destinationShelf, book)
  	}
  
  
  
  render() {
    
    const { value, listBooksOnShelves } = this.props
    
    return (

		
		
			<div className="search-books">
			<div className="search-books-bar">
			
			<Link to='/' >Back to shelves</Link>
				
				<a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
					
				<div className="search-books-input-wrapper">
				
					<input type="text" 
						placeholder="Search by title or author"
						value={value}
						onChange={(event) => {this.onSearchingBook(event.target.value); }}
					/>
				</div>
			</div> 
            
            
            <SearchBookResult 
            	onchangeBookshelf={this.onchangeBookshelf}
            	onAddToBookshelf={this.onAddToBookshelf}
            	listBooks={this.state.books}
            	listBooksOnShelves={listBooksOnShelves}  
            />
            
    
        </div>
		
		
    
    )
  }
}

export default SearchBookBar
