import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

/* 
	BookShelf.js
	React component for bookshelf in myReads Book Tracker App
	Author: Steve Prager
*/

class BookShelf extends React.Component {

    /* Book shelf requires a title and a list of books to render as props */
	static propTypes = {
		title: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired
		// maybe pass shelves down as a prop? 
	}

	render() {
		return <div className="bookshelf">
	               <h2 className="bookshelf-title">{this.props.title}</h2>
                   <div className="bookshelf-books">
	                   <ol className="books-grid">
	                   {this.props.books.map((book) => 
			               <li key={book.title}>
		                       <Book title={book.title}
			                         height={book.height}
			                         width={book.width}
			                         imageURL={book.imageURL}
			                         author={book.author}
			                    />
		                    </li>
	                   	)}
	                   </ol>
	               </div>
               </div>
	}
}

export default BookShelf