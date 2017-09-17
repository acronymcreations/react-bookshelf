import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Link, Route} from 'react-router-dom'
import Search from './Search'
import Shelf from './Shelf'


class BooksApp extends React.Component {
  state = {
    book_list: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((b) => {
      this.setState({book_list:b})
    })
  }

  changeShelf = (book, event) => {
    BooksAPI.update(book, event.target.value).then((b) => {
      BooksAPI.getAll().then((b) => {
        this.setState({book_list:b})
      })
    })
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={({history}) => (
          <Search
            addBook={(book, event) => {
              BooksAPI.update(book, event.target.value).then((b) => {
                BooksAPI.getAll().then((b) => {
                  this.setState({book_list:b})
                  history.push('/')
                })
              })
            }}
            list={this.state.book_list}
          />
        )}/>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  list={this.state.book_list}
                  shelf='currentlyReading'
                  shelf_name='Currently Reading'
                  onChangeShelf={this.changeShelf}
                />
                <Shelf
                  list={this.state.book_list}
                  shelf='wantToRead'
                  shelf_name='Want to Read'
                  onChangeShelf={this.changeShelf}
                />
                <Shelf
                  list={this.state.book_list}
                  shelf='read'
                  shelf_name='Read'
                  onChangeShelf={this.changeShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to={{pathname: "/search", state: {book_list: this.state.book_list}}}>Add a Book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
