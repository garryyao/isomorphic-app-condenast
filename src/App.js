import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './Routes'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: null,
    }
  }

  componentWillMount() {
    if (window.DATA_ARTICLES) {
      this.setState({
        articles: window.DATA_ARTICLES
      })
    } else {
      fetch('/api-data.json')
      .then((res) => res.json())
      .then(data => {
        this.setState({
          articles: data
        })
      }).catch(err => {
        throw err
      })
    }
  }

  render() {
    const articles = this.state.articles

    if (!articles) {
      return <div>Loading...</div>
    }

    return (
      <Router>
        <Routes articles={articles} />
      </Router>
    );
  }
}

export default App;
