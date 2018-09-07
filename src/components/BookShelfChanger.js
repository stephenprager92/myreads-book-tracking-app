import React from 'react'
import PropTypes from 'prop-types'

/* 
	BookShelfChanger.js
	React component for a book shelf changer in myReads Book Tracker App
	Note one of these components is assigned to each book instance
	Author: Steve Prager
*/

class BookShelfChanger extends React.Component {

    /* Shelf Changer required props */
	static propTypes = {
		onUpdateShelf: PropTypes.func.isRequired,
		bookItem: PropTypes.object.isRequired
	}

	render() {

		const { onUpdateShelf, bookItem } = this.props

		return <div className="book-shelf-changer">
	               <select onChange={(event) => onUpdateShelf(bookItem, event.target.value)} value={(bookItem.shelf ? bookItem.shelf : "none")}>
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