import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
// import {Link, Route} from 'react-router-dom'

class SearchResult extends Component{
  state = {}

  componentDidMount = () => {
    // console.log(this.props.book_list)
  }

  checkForShelf = (b) => {
    for(var i in this.props.book_list){
      if(b.id === this.props.book_list[i].id){
        console.log(b.title)
        return this.props.book_list[i].shelf
      }
    }
    return 'none'
  }

  render(){
    let books = this.props.list
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf_name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(b =>
              <li key={b.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${b.imageLinks['thumbnail']})` }}></div>
                    <div className="book-shelf-changer">


                    {!this.props.book_list.includes(b) && (
                      <select defaultValue={this.checkForShelf(b)}
                        onChange={(event) => this.props.onAddBook(b, event)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                      </select>
                    )}
                    </div>
                  </div>
                  <div className="book-title">{b.title}</div>
                  <div className="book-authors">
                    {b.authors !== undefined && (
                      b.authors[0]
                    )}
                  </div>
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchResult
