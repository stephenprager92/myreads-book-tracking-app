import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger.js'

/* 
	Book.js
	React component for an individual book in myReads Book Tracker App
	Author: Steve Prager
*/

class Book extends React.Component {

    /* Book required props */
	static propTypes = {
		// id: PropTypes.string.isRequired,
		// title: PropTypes.string.isRequired,
		// authors: PropTypes.array.isRequired,
		// imageURL: PropTypes.string.isRequired,
		// onUpdateShelf: PropTypes.func.isRequired,
		// shelf: PropTypes.string.isRequired,
		bookItem: PropTypes.object.isRequired
	}

	render() {

		const { bookItem, onUpdateShelf } = this.props

		return <li>
				   <div className="book">
				       <div className="book-top">
				           <div className="book-cover" style={{ width: 128, 
				           	                                    height: 192, 
				           	                                    backgroundImage:((bookItem.imageLinks && bookItem.imageLinks.smallThumbnail) ? 
				           	                                                      `url(${bookItem.imageLinks.smallThumbnail})` : "none")}}></div>
	                       <BookShelfChanger
		                       onUpdateShelf={onUpdateShelf}
		                       shelf={bookItem.shelf}
		                       bookItem={bookItem}
	                        />
	                   </div>
	                   <div className="book-title">{bookItem.title}</div>
	                   <div className="book-authors">
		                   {/*If there's more than one author, join the array of names appropriately*/}
		                   {(bookItem.authors && bookItem.authors.length) > 1 ? 
		                    bookItem.authors.join(", ") : bookItem.authors}
	                   </div>
	               </div>
               </li> 
    }
}

export default Book