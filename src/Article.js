import React from 'react';
import {Link} from 'react-router-dom'

const contentTypeToElementMap = {
  'plaintext': ['p'],
  'h2': ['h2'],
  'pull_quote': ['blockquote', { className: 'blockquote'}]
}

const Article = ({article}) => {
  return <div className="container">
    <div className="row justify-content-center">
      <article className="col">
        <Link className="nav-back fixed-top" to="/">Home</Link>
        <div className="py-4"/>
        <main className="article-block">
          <h1 className="pt-3">{article.title}</h1>
          <hr />
          {
            article.body.map((content, index) => {
              const [type, props] = contentTypeToElementMap[content.type]
              return React.createElement(type, {...props, key: index}, content.body)
            })
          }
        </main>
      </article>
    </div>
  </div>
}

export default Article;
