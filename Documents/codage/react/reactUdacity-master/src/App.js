import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Bookshelf from './Bookshelf'
import MyReads from './MyReads'
import { Route } from 'react-router-dom'

import SearchBookBar from './SearchBookBar'
//import serializeForm from 'form-serialize'




class BooksApp extends React.Component {
	
	state = {
    
		currentlyReading : [],
		
		WantToRead : [],
		
		Read : []

  	}
  
  
  	componentDidMount() {
    	BooksAPI.getAll().then((books) => {
      		this.setState({ 
      			currentlyReading : books.filter( book => book.shelf === 'currentlyReading'),
      			WantToRead : books.filter( book => book.shelf === 'wantToRead'),
      			Read : books.filter( book => book.shelf === 'read')
    		})
  		})
  	}
  

	
	onchangeBookshelf = (destinationShelf, id, currentShelf) => {
    	
    	var bookArray

    	if(currentShelf==='currentlyReading'){
    		var newcurrentlyReading = this.state.currentlyReading.filter(book => book.id !== id)
    		bookArray = this.state.currentlyReading.filter(book => book.id === id)
    		this.setState({ currentlyReading : newcurrentlyReading })
    		this.state.currentlyReading.map(book => (BooksAPI.update(book, currentShelf))) 
    	}
    	else if(currentShelf==='wantToRead'){
    		var newWantToRead = this.state.WantToRead.filter(book => book.id !== id)
    		bookArray = this.state.WantToRead.filter(book => book.id === id)
    		this.setState({ WantToRead : newWantToRead })
    		this.state.WantToRead.map(book => (BooksAPI.update(book, currentShelf))) 
    	}
    	else if(currentShelf==='read'){
    		var newRead = this.state.Read.filter(book => book.id !== id)
    		bookArray = this.state.Read.filter(book => book.id === id)
    		this.setState({ Read : newRead })
    		this.state.Read.map(book => (BooksAPI.update(book, currentShelf)))
    	}
    	
    	if(destinationShelf==='currentlyReading'){
    		bookArray[0].shelf = 'currentlyReading'
    		newcurrentlyReading = this.state.currentlyReading.concat(bookArray)
    		this.setState({ currentlyReading : newcurrentlyReading })
    		this.state.currentlyReading.map(book => (BooksAPI.update(book, destinationShelf)))
    	}
    	else if(destinationShelf==='wantToRead'){
    		bookArray[0].shelf = 'wantToRead'
    		newWantToRead = this.state.WantToRead.concat(bookArray)
    		this.setState({ WantToRead : newWantToRead })
    		this.state.WantToRead.map(book => (BooksAPI.update(book, destinationShelf)))
    	}
    	else if(destinationShelf==='read'){
    		bookArray[0].shelf = 'read'
    		newRead = this.state.Read.concat(bookArray)
    		this.setState({ Read : newRead })
    		this.state.Read.map(book => (BooksAPI.update(book, destinationShelf)))
    	}
    	
    
  	}
	
	
	
	onAddToBookshelf = (destinationShelf, book) => {
	
		var newcurrentlyReading = this.state.currentlyReading.filter(b => b.id !== book.id)
		var newWantToRead = this.state.WantToRead.filter(b => b.id !== book.id)
		var newRead = this.state.Read.filter(b => b.id !== book.id)
		
		book.shelf = destinationShelf

		if(destinationShelf==='currentlyReading'){
    		this.setState({ 
    			currentlyReading : newcurrentlyReading.concat(book),
    			WantToRead : newWantToRead,
    			Read : newRead
    		})
    		this.state.currentlyReading.map(book => (BooksAPI.update(book, destinationShelf)))
    	}
    	else if(destinationShelf==='wantToRead'){
    		this.setState({ 
    			currentlyReading : newcurrentlyReading,
    			WantToRead : newWantToRead.concat(book),
    			Read : newRead
    		})
    		this.state.WantToRead.map(book => (BooksAPI.update(book, destinationShelf)))
    	}
    	else if(destinationShelf==='read'){
    		this.setState({ 
    			currentlyReading : newcurrentlyReading,
    			WantToRead : newWantToRead,
    			Read : newRead.concat(book)
    		})
    		this.state.Read.map(book => (BooksAPI.update(book, destinationShelf)))
    	}	
  }
	
	
  	

	render() {
    return (
    	<div>
      
			<Route exact path='/' render={() => (
				<div className="app">
					<div className="list-books">
						<MyReads />
						<div className="list-books-content">
							
							<Bookshelf 
								onAddToBookshelf={this.onAddToBookshelf}
								onchangeBookshelf={this.onchangeBookshelf} 
								bookshelfTitle="Currently reading" 
								books={this.state.currentlyReading} 
							/>
							
							<Bookshelf 
								onAddToBookshelf={this.onAddToBookshelf} 
								onchangeBookshelf={this.onchangeBookshelf} 
								bookshelfTitle="Want to Read" 
								books={this.state.WantToRead} 
							/>
							
							<Bookshelf 
								onAddToBookshelf={this.onAddToBookshelf} 
								onchangeBookshelf={this.onchangeBookshelf} 
								bookshelfTitle="Read" 
								books={this.state.Read} 
							/>
							
						</div>
					</div>
        		</div>
            )}/>
            
            
            <Route exact path='/search' render={() => (
            	<div className="app">
            	<div className="list-books">
            		<SearchBookBar 
            			listBooksOnShelves={this.state} 
            			onchangeBookshelf={this.onchangeBookshelf} 
            			onAddToBookshelf={this.onAddToBookshelf} 
            		/>
            	</div>
            	</div>
            )}/>

		</div>
    )}
    
    
    
}



export default BooksApp















