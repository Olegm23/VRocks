import React, {useState, useEffect} from 'react'
import './css/App.scss'
import './css/normalize.css'
import './css/skeleton.css'

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function take(n, xs) {
  var result = [];
  for (var i = 0; i < Math.min(n, xs.length); i++) {
    result.push(xs[i]);
  }
  return result;
}

function articlesWithAuthors(articles, authors) {
  var result = [];
  var author;
  for (var i = 0; i < articles.length; i++) {
    author = authors.filter(author => articles[i].userId === author.id)[0];
    result.push({
      title: articles[i].title,
      content: articles[i].body,
      author: (author ? author.name : ''),
      id: articles[i].id
    });
  }
  return result;
}

function Article(props) {
  return (
    <div className='article'>
      <p className='title'>{capitalize(props.article.title)}</p>
      <p className='content'>{capitalize(props.article.content)}</p>
      <p className='author'>{props.article.author}</p>
    </div>
  )
}

function App() {
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setArticles(json));

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setAuthors(json));
  }, []);

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function filterArticles(article) {
    return query
      ? article.author.toUpperCase().includes(query.toUpperCase())
      : true;
  }

  return (
    <div className="container">
      <div className="search">
        <i className="fas fa-search"></i>
        <input
          type="search"
          id="filter"
          name="filter"
          placeholder="Filter by author..."
          onChange={handleChange} />
      </div>

      <div className="articles">
        {take(100, articlesWithAuthors(articles, authors).filter(filterArticles)).map((article, i) => {
          return <Article key={'article-' + article.id} article={article} />
        })}
      </div>
    </div>
  )
}

export default App;