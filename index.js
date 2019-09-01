import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.css';

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
    fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => response.json())
    .then(albums => this.setState({ isLoading: false, albums }))
    .catch(this.onError);

    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => this.setState({ users }))
    .catch(this.onError);
  }

  render() {
    let user = [];
    const { albums, users } = this.state;
    console.log(users);

    if (this.state.isError) {
      return "Unexpected error. Please, contact support.";
    }

    return this.state.isLoading ? (
      "....Loading...."
      ) : (
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
    );
  }
}

render(<Albums />, document.getElementById('root'));
