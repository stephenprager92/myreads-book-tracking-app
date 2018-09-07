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
      Collection of all books currently in the home app. Since this is the 
      parent component of the app, this should hold the book data and pass 
      it down to child components when required
    */
    books: []
  }

  /* 
    Asynchronously retrieve book data for the first time AFTER
    the app component initially mounts. Once retrieved, set the new state
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books : books })
    })
  }

  /*
    Update a book's shelf first in the local state, then in the API
    Used by the BookShelfChanger components
  */
  updateShelf = (book, shelf) => {

    // Find the book's current shelf in a new array
    const updateIndex = this.state.books.findIndex((b) => b.id === book.id)
    const updatedBookList = this.state.books

    // If we couldn't find the index, book is not yet on 
    // any shelf. Set it and then add it in
    if (updateIndex === -1) {
      book.shelf = shelf
      updatedBookList.push(book)
    }
    // Otherwise, update its current shelf and then the state
    else {
      updatedBookList[updateIndex].shelf = shelf
    }

    this.setState({
      books: updatedBookList
    })

    // Update the API
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        {/*Here we are adding Routes to replace the state dependent page management */}
        <Route path="/search" render={() => ( 
          <BookSearch
            // onSearch={this.searchForBook}
            storedBooks={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
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
