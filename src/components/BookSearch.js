import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI' 

/* 
	BookSearch.js
	React component for book search UI in myReads Book Tracker App
	Author: Steve Prager
*/

class BookSearch extends React.Component {

    /* Search required props */
	static propTypes = {
		storedBooks: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}

    /* State contains query of search and currently searched books */
	state = {
		query: "",
		searchedBooks: []
	}

	/* 
	   Update query with latest user input. 
	   Also, conduct the BooksAPI search passed down 
	   from the parent app and show searched books
    */
	updateQuery = (query) => {

		const { storedBooks } = this.props
		
		// First, set state with the query (since for fast typers 
		// the query can move faster than the asynchronous search)
		this.setState({query: query})
		
		// Search the Books API. If a search result is in our app's list 
		// of shelved books, assign the appropriate shelf in the search view.
		BooksAPI.search(query).then((searchResults) => {
			if (searchResults && searchResults.length > 0) {
				for (let i = 0; i < searchResults.length; i++) {
					for (let j = 0; j < storedBooks.length; j++) {
						if (searchResults[i].id === storedBooks[j].id) {
							const shelvedBookIndex = storedBooks.findIndex((book) => book.id === searchResults[i].id)
							searchResults[i].shelf = storedBooks[shelvedBookIndex].shelf
						}
					}
				}
			}			

            // When appropriate shelves have been assigned, set state with the searched books
			this.setState({ searchedBooks: searchResults })
		})
	}

	render() {

		const { query } = this.state

		return <div className="search-books">
		           <div className="search-books-bar">
		               {/* Close search - Link to home route */}
		               <Link className="close-search" to="/">Close</Link>
		               <div className="search-books-input-wrapper">
			               {/*
				               NOTES: The search from BooksAPI is limited to a particular set of search terms.
				               You can find these search terms here:
				               https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

				               However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
				               you don't find a specific author or title. Every search is limited by search terms.
				           */}
			                <input type="text" 
			                       value={query}
			                       placeholder="Search by title or author"
			                       onChange={(event) => this.updateQuery(event.target.value)}
			                />
		               </div>
		           </div>
	               <div className="search-books-results">
		               <ol className="books-grid">
		                   {/* Map search results, but first validate that there is
		                       indeed a results array to map*/}
			               {this.state.searchedBooks && 
			               	this.state.searchedBooks.length > 0 && 
			               	this.state.searchedBooks.map((book) => (
				               <Book
				                   key={book.id}
		                           onUpdateShelf={this.props.onUpdateShelf}
			                       bookItem={book}
				               />
			               	))} 
		               </ol>
		           </div>
	           </div>
	}
}

export default BookSearch