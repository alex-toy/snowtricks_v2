import React from 'react'


class ShelfSelectForm extends React.Component {

  	
  	handleChange = (destinationShelf, book) => {
  		//alert('handleChange : ' + this.props.actualShelf)
    	var currentShelf = this.props.book.shelf
    	if(currentShelf !== undefined){
    		this.props.onchangeBookshelf(destinationShelf, book.id, currentShelf)
    	}else{
    		this.props.onAddToBookshelf(destinationShelf, book)
    	}
  	}
  	
  	
  	
	render() {
	
	const currentShelf = this.props.book.shelf
	
	var value
	if(currentShelf === 'currentlyReading'){
      	value = 'currentlyReading'
	} else if(currentShelf === 'wantToRead'){
      	value = 'wantToRead'
	} if(currentShelf === 'read'){
      	value = 'read'
	}
	
	
    return (
      <form>
          <div className="book-shelf-changer">
          <select value={value} onChange={(event) => {this.handleChange(event.target.value, this.props.book)}}>
				<option value="none">Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
          </select>
        </div>
      </form>
    );
  }

  
  
  
}

export default ShelfSelectForm