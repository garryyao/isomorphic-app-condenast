import React, { Component } from 'react';
import {
  BrowserRouter  as Router,
  HashRouter,
  Route,
} from 'react-router-dom'
import ArticleList from './ArticleList'
import Article from './Article'
import './App.css';

const NotFound = () => (
  <div>
    No article found here.
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: null,
    }
  }

  componentWillMount() {
    fetch('api-data.json')
    .then((res) => res.json())
    .then(data => {
      this.setState({
        articles: data
      })
    }).catch(err => {
      throw err
    })
  }

  render() {
    const articles = this.state.articles

    if (!articles) {
      return <div>Loading...</div>
    }

    return (
      <Router>
        <div>
          <Route path="/article/:id" render={({match}) => {
            const id = match.params.id
            const article = articles[id]
            return article ? <Article article={article}/> : <NotFound />
          }}/>
          <Route exact path="/" render={({...rest}) => (
            <ArticleList articles={articles} {...rest} />
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
