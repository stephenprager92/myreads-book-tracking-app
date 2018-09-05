import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import BookSearch from './components/BookSearch'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Title from './components/Title'

class BooksApp extends React.Component {

  state = {
    /* 
      Collection of all books in app (both displayed and not)
      Since this is the parent component of the app, this should 
      hold the book data and pass it down to child components when required
    */
    books: []
  }

  /*
    Helper method - asynchronously retrieve book data from the BooksAPI
    Once retrieved, set the new state.
  */
  retrieveBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books : books })
    })
  }

  /* 
    Retrieve books for the first time AFTER the app component initially mounts
  */
  componentDidMount() {
    this.retrieveBooks()
  }

  /*
    Update a book's shelf first in the API, then in the local state
    Used by the BookShelfChanger components

    NOTE: I'm not sure what's better practice here, updating the local shelf first
    or updating the API. Doing the local shelf first has the disadvantage of potentially
    not saving a change you thought you made (if you can't reach the server), 
    while doing the API first takes longer. Ultimately made a judgment call.
  */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
            .then(() => {
            this.retrieveBooks()
            })
  }

  render() {
    return (
      <div className="app">
        {/*Here we are adding Routes to replace the state dependent page management */}
        <Route path="/search" render={() => ( 
          <BookSearch/>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <Title/>
            <div className="list-books-content">
              <div>
                {/* Filter to get the "currently reading" books from the state and pass as prop to the shelf */}
                <BookShelf
                  className="bookshelf"
                  title="Currently Reading"
                  books={this.state.books.filter((book) => book.shelf === "currentlyReading")}
                  updateShelf={this.updateShelf}
                />
                {/* Filter to get the "want to read" books from the state and pass as prop to the shelf */}
                <BookShelf
                  className="bookshelf"
                  title="Want to Read"
                  books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                  updateShelf={this.updateShelf}
                />
                {/* Filter to get the "read" books from the state and pass as prop to the shelf */}
                <BookShelf
                  className="bookshelf"
                  title="Read"
                  books={this.state.books.filter((book) => book.shelf ==="read")}
                  updateShelf={this.updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              {/* Replace anchor with link that routes appropriately */}
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
      )
  }
}

export default BooksApp
