import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger.js'

/* 
	Book.js
	React component for an individual book in myReads Book Tracker App
	Author: Steve Prager
*/

class Book extends React.Component {

    /* Book requires a title, an author, a height / width, and an image URL as props */
	static propTypes = {
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		height: PropTypes.number.isRequired,
		width: PropTypes.number.isRequired,
		imageURL: PropTypes.string.isRequired
	}

	render() {

		const { title, author, height, width, imageURL } = this.props

		return <div className="book">
	               <div className="book-top">
	                   <div className="book-cover" 
	                        style={{ width: width, 
                                     height: height, 
                                     backgroundImage:`url(${imageURL})`
                                  }}></div>
                       <BookShelfChanger/>
                    </div>
                   <div className="book-title">{title}</div>
                   <div className="book-authors">{author}</div>
               </div>
    }
}

export default Book