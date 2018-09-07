import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

/* 
	BookShelf.js
	React component for bookshelf in myReads Book Tracker App
	Author: Steve Prager
*/

class BookShelf extends React.Component {

    /* Book Shelf required props */
	static propTypes = {
		title: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		updateShelf: PropTypes.func.isRequired
	}

	render() {
		return <div className="bookshelf">
	               <h2 className="bookshelf-title">{this.props.title}</h2>
                   <div className="bookshelf-books">
	                   <ol className="books-grid">
	                   {this.props.books.map((book) =>  
		                       <Book key={book.id}
			                         onUpdateShelf={this.props.updateShelf}
			                         bookItem={book}
			                    />
	                   	)}
	                   </ol>
	               </div>
               </div>
	}
}

export default BookShelf