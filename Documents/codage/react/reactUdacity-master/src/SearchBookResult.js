import React from 'react'
import Book from './Book' 

class SearchBookResult extends React.Component {
  
  onchangeBookshelf = (shelf, id, actualShelf) => {
    this.props.onchangeBookshelf(shelf, id, actualShelf)
  }
  
  onAddToBookshelf = (destinationShelf, id) => {
  		this.props.onAddToBookshelf(destinationShelf, id)
	}
  
  
  
  render() {
    
    const { listBooks, listBooksOnShelves } = this.props
    
    var listBookUpdated = listBooks.map(book => {
    	listBooksOnShelves.currentlyReading.map( bookOnShelf => {if(bookOnShelf.id===book.id){book.shelf = bookOnShelf.shelf}; return book} )
    	listBooksOnShelves.WantToRead.map( bookOnShelf => {if(bookOnShelf.id===book.id){book.shelf = bookOnShelf.shelf}; return book} )
    	listBooksOnShelves.Read.map( bookOnShelf => {if(bookOnShelf.id===book.id){book.shelf = bookOnShelf.shelf}; return book} )
    	return book
    })
    
    //console.log(listBookUpdated)
   
   if(listBookUpdated.length === 0 ){
   			return(<div className="search-books-results">No books were found, sorry</div>);
   }
   
    
    return (

			<div className="search-books-results">
              
              <ol className="books-grid">
              {listBookUpdated.map(book => (
              
					<Book 
						onchangeBookshelf={this.onchangeBookshelf}
						onAddToBookshelf={this.onAddToBookshelf} 
						key={book.id} 
						book={book}
					/>
              			
				))}

              </ol>
            </div>
		
		
    
    )
  }
}

export default SearchBookResult
