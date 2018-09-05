import React from 'react'
import PropTypes from 'prop-types'

/* 
	BookShelfChanger.js
	React component for a book shelf changer in myReads Book Tracker App
	Author: Steve Prager
*/

class BookShelfChanger extends React.Component {

    /* Shelf Changer required props */
	static propTypes = {
		onUpdateShelf: PropTypes.func.isRequired,
		shelf: PropTypes.string.isRequired,
		bookItem: PropTypes.object.isRequired
	}

	render() {

		const { onUpdateShelf, bookItem, shelf } = this.props

		return <div className="book-shelf-changer">
	               <select onChange={(event) => onUpdateShelf(bookItem, event.target.value)} value={shelf}>
		               <option value="move" disabled>Move to...</option>
                       <option value="currentlyReading">Currently Reading</option>
                       <option value="wantToRead">Want to Read</option>
                       <option value="read">Read</option>
                       <option value="none">None (Remove)</option>
                   </select>
               </div>
	}
}

export default BookShelfChanger