import React from 'react'


class ChoiceDisplay extends React.Component {


	state = {
    
		currentShelf : ''

  	}
	


  render() {
  
	const { onchangeBookshelf, bookTitle, actualShelf } = this.props
	

    	if(actualShelf === 'Currently reading'){
      return (
		<div className="book-shelf-changer">
		  <select onChange={(event) => onchangeBookshelf(event.target.value, bookTitle, actualShelf)}>
				<option value="none">Move to...</option>
				<option value="currentlyReading" selected>Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
		  </select> 
		</div>
		)}
		else if(actualShelf === 'Want to Read'){
		  return (
			<div className="book-shelf-changer">
			  <select onChange={(event) => onchangeBookshelf(event.target.value, bookTitle, actualShelf)}>
					<option value="none">Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead" selected>Want to Read</option>
					<option value="read">Read</option>
			  </select> 
			</div>
			)}
		else if(actualShelf === 'read'){
		  return (
			<div className="book-shelf-changer">
			  <select onChange={(event) => onchangeBookshelf(event.target.value, bookTitle, actualShelf)}>
					<option value="none">Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read" selected>Read</option>
			  </select> 
			</div>
			)}	
		else{
		  return (
			<div className="book-shelf-changer">
			  <select onChange={(event) => onchangeBookshelf(event.target.value, bookTitle, actualShelf)}>
					<option value="none">Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
			  </select> 
			</div>
			)}
		
  }
}

export default ChoiceDisplay










