import React from 'react';
import {Link} from 'react-router-dom'

const ArticleList = ({match, articles}) => {
  return <div className="container-fluid">
      <ul className="row list-unstyled no-gutters">
        {articles.map(article => (
          <li key={article.id} className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
            <Link to={`${match.url}article/${article.id}`}>
              <div className="card card-inverse">
                <img className="cover card-img" alt={article.title} src={article.cover}/>
                <div className="card-img-overlay">
                  <h3 className="card-title">{article.title}</h3>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
  </div>
}
export default ArticleList;
