import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
// import {Link, Route} from 'react-router-dom'

class Book extends Component{
  state = {}

  render(){
    let books = this.props.list.filter(b => b.shelf === this.props.shelf)
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf_name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(b =>
              <li>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: b.cover_url }}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={b.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{b.name}</div>
                  <div className="book-authors">{b.author}</div>
                </div>
              </li>
            )}

          </ol>
        </div>
      </div>
    )
  }
}

export default Book
