import React from 'react'
import PropTypes from 'prop-types'

/* 
	BookShelfChanger.js
	React component for a book shelf changer in myReads Book Tracker App
	Author: Steve Prager
*/

class BookShelfChanger extends React.Component {

    /* Shelf changer only requires a list of shelves as a prop */
	static propTypes = {
		shelves: PropTypes.array.isRequired
	}

	render() {

		return <div className="book-shelf-changer">
	               <select>
		               <option value="move" disabled>Move to...</option>
                       <option value="currentlyReading">Currently Reading</option>
                       <option value="wantToRead">Want to Read</option>
                       <option value="read">Read</option>
                       <option value="none">None</option>
                   </select>
               </div>
	}
}