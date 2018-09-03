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
    Perform the asynchronous fetch from the BooksAPI 
    (AFTER the app component initially mounts) to get the books data
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books : books })
      console.log(this.state.books)
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
                />
                {/* Filter to get the "want to read" books from the state and pass as prop to the shelf */}
                <BookShelf
                  className="bookshelf"
                  title="Want to Read"
                  books={this.state.books.filter((book) => book.shelf === "wantToRead")}
                />
                {/* Filter to get the "read" books from the state and pass as prop to the shelf */}
                <BookShelf
                  className="bookshelf"
                  title="Read"
                  books={this.state.books.filter((book) => book.shelf ==="read")}
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
