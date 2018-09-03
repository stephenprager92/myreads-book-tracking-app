import React from 'react'
import PropTypes from 'prop-types'

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
	}

	render() {
		return <div className="bookshelf">
	               <h2 className="bookshelf-title">{this.props.title}</h2>
                   <div className="bookshelf-books">
	                   <ol className="books-grid">
	                   {this.props.books.map((book) => 
			               <li key={book.title}>
		                       <div className="book">
			                       <div className="book-top">
			                           <div className="book-cover" style={{ width: book.width, 
			                                                                height: book.height, 
			                                                                backgroundImage:`url(${book.imageURL})`
			                                                             }}></div>
		                               <div className="book-shelf-changer">
				                           <select>
				                               <option value="move" disabled>Move to...</option>
				                               <option value="currentlyReading">Currently Reading</option>
				                               <option value="wantToRead">Want to Read</option>
				                               <option value="read">Read</option>
				                               <option value="none">None</option>
				                            </select>
			                            </div>
			                        </div>
			                        <div className="book-title">{book.title}</div>
			                        <div className="book-authors">{book.author}</div>
		                        </div>
		                    </li>
	                   	)}
	                   </ol>
	               </div>
               </div>
	}
}

export default BookShelf