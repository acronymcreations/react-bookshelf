import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link} from 'react-router-dom'
import SearchResult from './SearchResult'

class Search extends Component{
  state = {
    query: '',
    results: [],
    book_list: []
  }

  componentDidMount = function() {
    this.setState({book_list: this.props.location.state.book_list})
  }

  findBook = (query) => {
    this.setState({query:query})
    if(this.state.query.length > 1){
      BooksAPI.search(this.state.query).then((results) => {
        this.setState({results:results})
      })
    }
  }

  addBook = (book, event) => {
    BooksAPI.update(book, event.target.value).then((b) => {
      console.log("Book Added")
    })
  }



  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Back</Link>
          <div className="search-books-input-wrapper">
            {}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.findBook(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
         {this.state.results !== undefined && (
           this.state.results.length > 0 && (
             <SearchResult
              list={this.state.results}
              shelf_name='Results'
              book_list={this.state.book_list}
              onAddBook={this.addBook}
            />
           )
         )}
      </div>
    )
  }
}

export default Search
