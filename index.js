import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.css';

const urls = [
  'https://jsonplaceholder.typicode.com/albums',
  'https://jsonplaceholder.typicode.com/users'
];

const urlList = {
  'https://jsonplaceholder.typicode.com/albums': 'albums',
  'https://jsonplaceholder.typicode.com/users': 'users'
};

class Albums extends React.Component {
  state = {
    isLoading: true,
    isError: false,
    albums: [],
    users: [],
  };

  onError = error => {
    this.setState({ isError: true });
  };

  componentDidMount() {
    const setData = (url, data) => {
      urlList[url] === 'users' ? this.setState({ users: data }) : this.setState({ albums: data });
      this.state.users !== [] && this.state.albums !== [] ? this.setState({ isLoading: false }) : '';
    };

    Promise.all(['https://jsonplaceholder.typicode.com/albums', 'https://jsonplaceholder.typicode.com/users']).then(value => { 
      value.map(url => fetch(url)
      .then(response => response.json())
      .then(items => setData(url, items)));
    }, reason => {
      this.setState({ isError: this.onError })
    });
  }

  render() {
    let user = [];
    const { albums, users } = this.state;

    if (this.state.isError) {
      return "Unexpected error. Please, contact support.";
    }

    return this.state.isLoading ? (
      "....Loading...."
      ) : (
      <div>
        <h2>All albums</h2>
        <ul>
          {albums.map(album => (
            <li key={album.id}>
              {album.title}:  
              {users.filter(user => album.userId === user.id).map(user => (
                <i style={{ color: 'red' }}>({user.name})</i>
              ))}
            </li>
          ))}
        </ul>
        <h2>All users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name}:  
              {albums.filter(album => album.userId === user.id).map(album => (
                <i key={album.id} style={{ color: 'red' }}><br />- {album.title}</i>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

render(<Albums />, document.getElementById('root'));
