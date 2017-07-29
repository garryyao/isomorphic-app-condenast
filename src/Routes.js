import React from 'react';
import {
  Route,
} from 'react-router-dom'
import ArticleList from './ArticleList'
import Article from './Article'

const NotFound = () => (
  <p>No article found here.</p>
)

const Routes = ({articles}) => {
  return <div>
      <Route path="/article/:id" render={({match}) => {
        const id = match.params.id
        const article = articles[id]
        return article ? <Article article={article}/> : <NotFound />
      }}/>
      <Route exact path="/" render={({...rest}) => (
        <ArticleList articles={articles} {...rest} />
      )}/>
    </div>
}

export default Routes;
