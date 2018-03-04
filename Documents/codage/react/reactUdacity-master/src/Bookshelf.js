import React from 'react'
import Book from './Book' 



class Bookshelf extends React.Component {

  	
  	onchangeBookshelf = (destinationShelf, title, currentShelf) => {
    	this.props.onchangeBookshelf(destinationShelf, title, currentShelf)
  	}
  	
  	
  	onAddToBookshelf = (destinationShelf, book) => {
  		this.props.onAddToBookshelf(destinationShelf, book)
  	}
	

  render() {
  
	const { books, bookshelfTitle } = this.props
  
  
    return (
      
		<div className="bookshelf">
        	<h2 className="bookshelf-title">{bookshelfTitle}</h2>
            <div className="bookshelf-books">
            
            
				<ol className="books-grid">
					{books.map(book => (
						
						<Book
							onchangeBookshelf={this.onchangeBookshelf}
							onAddToBookshelf={this.onAddToBookshelf} 
							book={book}
							key={book.id}
						/>
					))}
				</ol>
        
                    
            </div>
            
            
            
            
            
        </div>
    
    )
  }
}

export default Bookshelf
