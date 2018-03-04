import React from 'react'
import ShelfSelectForm from './ShelfSelectForm'


class Book extends React.Component {
  
  
  
  
	onchangeBookshelf = (destinationShelf, id, currentShelf) => {
    	this.props.onchangeBookshelf(destinationShelf, id, currentShelf)
	}
  
	onAddToBookshelf = (destinationShelf, book) => {
  		this.props.onAddToBookshelf(destinationShelf, book)
	}
  
  
  
  render() {
  
  	const { book } = this.props
  
  
  
    return (
      
		<li>
			<div className="book">
			  <div className="book-top">
					
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
					
					<ShelfSelectForm 
						onchangeBookshelf={this.onchangeBookshelf}
						onAddToBookshelf={this.onAddToBookshelf}
						book={book}
					/>
					

					</div>
						<div className="book-title">{book.title}</div>
						<div className="book-subtitle">{book.subtitle}</div>
						<div className="book-authors">{book.authors}</div>
						<div className="book-publisher">{book.publisher}</div>
					</div>
				
			
		</li>
    
    )
  }
}

export default Book










