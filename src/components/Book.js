import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger.js'

/* 
	Book.js
	React component for an individual book in myReads Book Tracker App
	Author: Steve Prager
*/

class Book extends React.Component {

    /* Book requires a title, an author and an image URL as props */
	static propTypes = {
		title: PropTypes.string.isRequired,
		authors: PropTypes.array.isRequired,
		imageURL: PropTypes.string.isRequired
	}

	render() {

		const { title, authors, imageURL } = this.props

		return <div className="book">
			       <div className="book-top">
			           <div className="book-cover" style={{ width: 128, height: 192, backgroundImage:`url(${imageURL})` }}></div>
                       <BookShelfChanger/>
                   </div>
                   <div className="book-title">{title}</div>
                   <div className="book-authors">
	                   {authors.join(", ")}
                   </div>
               </div>
    }
}

export default Book